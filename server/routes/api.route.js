import { Router } from 'express';
import axios from 'axios';

const router = new Router();
const API_KEY = 'PUT_API_KEY_HERE!';

router.route('/summoner/:region/:name').get(function(req, res){
	const summonerAddress = encodeURI('https://' + req.params.region + '.api.pvp.net/api/lol/' + req.params.region + '/v1.4/summoner/by-name/' + req.params.name + '?api_key=' + API_KEY);
	
	const summoner = {};
	
	axios.get(summonerAddress)
		.then((summonerData) => {
			summoner.id = summonerData.data[Object.keys(summonerData.data)[0]].id;
			summoner.name = summonerData.data[Object.keys(summonerData.data)[0]].name;
			summoner.region = req.params.region;
			
			const rankedAddress = encodeURI('https://' + req.params.region + '.api.pvp.net/api/lol/' + req.params.region + '/v2.5/league/by-summoner/' + summoner.id + '/entry?api_key=' + API_KEY);
			
			
			axios.get(rankedAddress)
				.then((rankedData) => {
					summoner.rankedLeague = rankedData.data[Object.keys(rankedData.data)[0]][0].tier;
					summoner.division = rankedData.data[Object.keys(rankedData.data)[0]][0].entries[0].division;
					summoner.wins = rankedData.data[Object.keys(rankedData.data)[0]][0].entries[0].wins;
					summoner.losses = rankedData.data[Object.keys(rankedData.data)[0]][0].entries[0].losses;
					summoner.lp = rankedData.data[Object.keys(rankedData.data)[0]][0].entries[0].leaguePoints;
					
					res.json(summoner);
				})
				.catch((err) => {
					console.log("*************");
					console.log("ERROR::");
					console.log(err);
					console.log("*************");
					res.status(err.data.status.status_code).json(err.data.status.message);
				});
		})
		.catch((err) => {
			console.log("*************");
			console.log("ERROR::");
			console.log(err);
			console.log("*************");
			res.status(err.data.status.status_code).json(err.data.status.message);
		});
});

router.route('/rankedData/:region/:id').get(function(req, res){
	let address = encodeURI('https://' + req.params.region + '.api.pvp.net/api/lol/' + req.params.region + '/v1.3/stats/by-summoner/' + req.params.id + '/ranked?api_key=' + API_KEY);
	
	axios.get(address)
		.then((object) => {
			let championList = [];
			
			for (let i = 0; i < object.data.champions.length; i++) {
				if (object.data.champions[i].stats.totalSessionsPlayed > 9) {
					let kda = (object.data.champions[i].stats.totalChampionKills + object.data.champions[i].stats.totalAssists) / object.data.champions[i].stats.totalDeathsPerSession;
					let winPercent = Math.round((object.data.champions[i].stats.totalSessionsWon) / object.data.champions[i].stats.totalSessionsPlayed * 100);
					
					if (object.data.champions[i].id > 0) {
						championList.push({
							id: object.data.champions[i].id,
							kda: kda.toFixed(2),
							winPercent: winPercent
						});
					}
				}
			}
			
			// Sort the list ascending then reverse it to get the best at the top
			championList.sort(function(a,b) {
				return parseFloat(a.winPercent) - parseFloat(b.winPercent);
			});
			
			championList.reverse();
			
			championList.splice(6);
			
			res.json(championList);
		})
		.catch((err) => {
			console.log("*************");
			console.log("ERROR::");
			console.log(err);
			console.log("*************");
			res.status(err.data.status.status_code).json(err.data.status.message);
		});
});

router.route('/matches/:region/:id').get(function(req, res){
	const matchlistAddress = encodeURI('https://' + req.params.region + '.api.pvp.net/api/lol/' + req.params.region + '/v2.2/matchlist/by-summoner/' + req.params.id + '?api_key=' + API_KEY);
	
	axios.get(matchlistAddress)
		.then((response) => {
			response.data.matches.splice(10);

			axios.all(response.data.matches.map((match) => axios.get(encodeURI('https://' + req.params.region + '.api.pvp.net/api/lol/' + req.params.region + '/v2.2/match/' + match.matchId + '?api_key=' + API_KEY))))
				.then((result) => {
					let allData = {
						wardAverage: 0,
						csAt10Average: 0,
						csAt20Average: 0,
						kdaAverage: 0,
						wardKillAverage: 0,
						wardsPlacedAverage: 0,
						killParticipationAverage: 0,
					};
					
					result.forEach((match) => {
						
						let matchDurationModifier = 10 / (match.data.matchDuration / 60);
						
						let participantId = -1;
						for (let part = 0; part < match.data.participantIdentities.length; part++) {
							if (match.data.participantIdentities[part].player.summonerId == req.params.id) {
								participantId = part;
							}
						}
						
						let player = match.data.participants[participantId];
						
						let currentTeam = player.teamId;
						
						// First lets check if the player is support. If so, get the carry on the same team and add their CS to yours
						if (player.timeline.role === "DUO_SUPPORT") {
							for (let other = 0; other < 10; other++) {
								let otherPlayer = match.data.participants[other];
								
								if (otherPlayer.teamId === currentTeam
									&& otherPlayer.timeline.role === "DUO_CARRY"
									&& typeof otherPlayer.timeline.creepsPerMinDeltas !== 'undefined') {
									
									console.log(otherPlayer.timeline.creepsPerMinDeltas);
									if (typeof otherPlayer.timeline.creepsPerMinDeltas.zeroToTen !== 'undefined') {
										allData.csAt10Average += otherPlayer.timeline.creepsPerMinDeltas.zeroToTen * 10;
									}
									
									if (typeof otherPlayer.timeline.creepsPerMinDeltas.tenToTwenty !== 'undefined') {
										allData.csAt20Average += otherPlayer.timeline.creepsPerMinDeltas.zeroToTen * 10 + otherPlayer.timeline.creepsPerMinDeltas.tenToTwenty * 10;
									}
								}
							}
						}
						
						// Get the total kills to find our players kill participation
						let totalKills = 0;
						
						for (let teammate = 0; teammate < 10; teammate++) {
							if (match.data.participants[teammate].teamId === currentTeam) {
								totalKills += match.data.participants[teammate].stats.kills;
							}
						}
						
						if (typeof player.timeline.creepsPerMinDeltas !== 'undefined') {
							if (typeof player.timeline.creepsPerMinDeltas.zeroToTen !== 'undefined') {
								allData.csAt10Average += player.timeline.creepsPerMinDeltas.zeroToTen * 10;
							}
							
							if (typeof player.timeline.creepsPerMinDeltas.tenToTwenty !== 'undefined') {
								allData.csAt20Average += player.timeline.creepsPerMinDeltas.zeroToTen * 10 + player.timeline.creepsPerMinDeltas.tenToTwenty * 10;
							}
						}
						
						allData.wardAverage += player.stats.visionWardsBoughtInGame * matchDurationModifier;
						allData.kdaAverage += (player.stats.kills + player.stats.assists) / (player.stats.deaths > 0 ? player.stats.deaths : 1)
						allData.wardKillAverage += player.stats.wardsKilled * matchDurationModifier;
						allData.wardsPlacedAverage += player.stats.wardsPlaced * matchDurationModifier;
						if (totalKills > 0) {
							allData.killParticipationAverage += (player.stats.kills + player.stats.assists) / totalKills;
						}
					});
					
					allData.csAt10Average /= 10;
					allData.csAt20Average /= 10;
					allData.wardAverage /= 10;
					allData.kdaAverage /= 10;
					allData.wardKillAverage /= 10;
					allData.wardsPlacedAverage /= 10;
					allData.killParticipationAverage /= 10;
					
					res.json(allData);
				})
				.catch((err) => {
					console.log("*************");
					console.log("ERROR::");
					console.log(err);
					console.log("*************");
					res.status(err.data.status.status_code).json(err.data.status.message);
				});
		})
		.catch((err) => {
			console.log("*************");
			console.log("ERROR::");
			console.log(err);
			console.log("*************");
			res.status(err.data.status.status_code).json(err.data.status.message);
		});
});

router.route('/champion').get(function(req, res){
	const address = encodeURI('https://global.api.pvp.net/api/lol/static-data/oce/v1.2/champion?dataById=true&champData=image&api_key=51d71c7d-786a-4a5a-9cac-1ea80957c5b7');
	
	axios.get(address)
		.then((response) => {
			res.json(response.data.data);
		})
		.catch((err) => {
			console.log("*************");
			console.log("ERROR::");
			console.log(err);
			console.log("*************");
			res.status(err.data.status.status_code).json(err.data.status.message);
		});
});

export default router;
