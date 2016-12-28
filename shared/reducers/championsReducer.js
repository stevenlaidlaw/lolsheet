export default function reducer(state = {
	data: null,
	fetching: false,
	fetched: false,
	error: null,
}, action) {
	switch(action.type) {
		case 'GET_CHAMPIONS_PENDING':
			return {
				...state,
				data: null,
				fetching: true,
				fetched: false,
				error: null,
			};
		case 'GET_CHAMPIONS_FULFILLED':
			return {
				...state,
				data: action.payload.data,
				fetching: false,
				fetched: true,
				error: null,
			};
		case 'GET_CHAMPIONS_REJECTED':
			return {
				...state,
				data: null,
				fetching: false,
				fetched: false,
				error: action.payload.data,
			};
		case 'CLEAR_CHAMPIONS':
			return {
				...state,
				data: null,
				fetching: false,
				fetched: false,
				error: null,
			};
		default:
			return state;
	}
}
