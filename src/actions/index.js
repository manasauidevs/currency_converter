import fetch from 'cross-fetch';

const GENERIC_ERROR = 'We are having technical issues, Please try again!';




/***
* CURRENCY CONVERTER
**/

const serviceURLS = {
	baseUrl: 'https://api.exchangeratesapi.io'
}

export const MONTHS = {
	0: '01',
	1: '02',
	2: '03',
	3: '04',
	4: '05',
	5: '06',
	6: '07',
	7: '08',
	8: '09',
	9: '10',
	10: '11',
	11: '12'
}

export const COUNTRY_CODES = ['USD', 'AUD', 'CAD', 'EUR', 'GBP', 'BGN', 'NZD', 'INR', 'JPY', 'HKD'];

export const COLOR_CODES = {
	'USD': '#8884d8',
	'AUD': '#82ca9d',
	'CAD': '#000',
	'EUR': '#C00',
	'GBP': '#00FFFF',
	'BGN': '#000080',
	'NZD': '#00008B',
	'INR': '#191970',
	'JPY': '#B22222',
	'HKD': '#8B0000'
}


function  gotResults( json, type ){

	return{
		type: type,
		data: json
	}
};

function gotError( error ){
	return{
		type: 'ERROR',
		data: {
			error: error || GENERIC_ERROR
		}

	}
}

export function getRecords( fromCountry, toCountry, fromDate, toDate, countries ){
	let queryParams = '?';
	if( fromCountry ){
		queryParams = queryParams + 'base=' + fromCountry;
	}
	
	return dispatch => {
		let URL = serviceURLS.baseUrl + '/history' + queryParams + '&symbols=' + ( toCountry ? toCountry : countries ) + '&start_at=' + fromDate + '&end_at=' + toDate;
		return fetch(URL, {
			method: 'GET'
		})
		.then(response => {
			if(response.status === 200)
				return response.json();
			else
				throw response.statusText;
		})
		.then(response => {
			let type = countries ? 'GOT_PROGRESSION_RESULTS' : 'GOT_CONVERSION_RESULTS';
			dispatch(gotResults(parseData( response, toCountry, countries ), type));
		})
		.catch(error => {
			dispatch(gotError( error || GENERIC_ERROR ));
		})
	}
}

function parseData( response, toCountry, countries ) {
	let data = [];

	if( countries ){
		let countriesList = countries.split(",");
		Object.keys(response.rates).forEach(function(key){
			let record = {};
			countriesList.forEach(function(countryCode){
				record.name = key.slice(-2);
				record[countryCode] = response.rates[key][countryCode]
			});
			data.push( record );
		});

		console.log( data );
		return data;
	}

	Object.keys(response.rates).forEach(function(key){
		data.push({
			name: key.slice(-2),
			conversion: response.rates[key][toCountry]
		})
	});
	console.log( data );
	return sortArray( data );
}

function sortArray( data ){
	data.sort(function(a, b){
    	if (parseInt(a.name) < parseInt(b.name)) {
    		return -1;
  		}
  		if (parseInt(a.name) > parseInt(b.name)) {
    		return 1;
  		}
  		return 0;
	})
	return data;
}



/**
* BITCOIN
**/

export function getBitcoinRecords(  ){
	return dispatch => {
		//let URL = 'http://api.bitcoincharts.com/v1/weighted_prices.json';
		let URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10';
		return fetch(URL, {
			method: 'GET'
		})
		.then(response => {
			if(response.status === 200)
				return response.json();
			else
				throw response.statusText;
		})
		.then(response => {
			dispatch(gotBitcoinResults(parseBitcoinData( response )));
		})
		.catch(error => {
			dispatch(gotError( error || GENERIC_ERROR ));
		})
	}
}

function  gotBitcoinResults(json, type){

	return{
		type: 'BITCOIN_RESULTS',
		data: json
	}
};


function parseBitcoinData( response ){

	let prices = response.prices;
	let bitcoinHistory = [];
	let length = prices.length;
	for( let i=length-1; i>prices.length-10; i--){
		var d = new Date(prices[i][0]);
		bitcoinHistory.push({
			name: ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2),
			price: Math.round(prices[i][1])
		})
	}
	let startDate = new Date(prices[length-1][0]);
	startDate = startDate.getFullYear() + "-" + ("0" + startDate.getMonth()).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
	return {
		startDate: startDate,
		data: bitcoinHistory
	};
}
