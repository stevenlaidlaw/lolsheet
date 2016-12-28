# LolSheet

## About

League of Legends statistics website to help you improve your game. This used to be available at `www.lolsheet.com`, but due to costs involved in running the server I've decided to take it offline. You are free to use this yourself, or run it on your own server somewhere asl ong as you give me credit.

## Setup

The only thing you should need to do is add your api key to the `consts.js` file. Let me know if anything isn't working at all.

To run the dev server just run the following:

```
$ npm i
$ npm run dev
$ browser http://localhost:3000
```

To deploy run
```
$ npm i
$ npm run start
```

## Tech Stack
LolSheet is built on [Node](https://nodejs.org/en/) using [Express](http://expressjs.com/) for the server and Facebook's [React](http://expressjs.com/) for the front-end. I used [Redux](https://github.com/reactjs/redux) for state management.

The app is universally rendered and built off the boilerplate I created for just that use-case located here: https://github.com/stevenlaidlaw/iso-redux-boilerplate
