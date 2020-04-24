const request = require('request');

const forecast = (query, {uv_index,wind_degree} = {}, callback) => {
	console.log(wind_degree)
	const url = 'http://api.weatherstack.com/forecast?access_key=855ca02bdf32404c75ca4e6a4d58b5b8&query=' + query
	request({url, json:true}, (error,{body}) => {
		// console.log(body);return false;
		if(error) {
			callback('Please check your internet connection',undefined)
		} else if(body.error){
			// const error_res = JSON.parse(body);
			callback(body.error.info,undefined)
		} else {
			// const data = JSON.parse(body);
			const forecast1 = {
				date : '20-08-2020',
				sunhour : '10.5'
			}
			// callback(undefined,body.forecast)
			callback(undefined,forecast1)
		}
	});
};

module.exports = {
	forecast : forecast
}