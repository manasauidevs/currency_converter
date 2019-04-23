const reducer = (state={}, action) => {
	switch(action.type){
		case 'GOT_CONVERSION_RESULTS':
			return {
				...state,
				conversionResponse: action.data
			};

		case 'GOT_PROGRESSION_RESULTS':
			return {
				...state,
				progressionResponse: action.data
			};


		case 'BITCOIN_RESULTS':
			return {
				...state,
				bitcoinResponse: action.data
			};

		case 'ERROR':
			return {
				...state,
				error: action.data.error
			};
		
		default:
			return state;
	}
}

export default reducer;