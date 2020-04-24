const request = require('request');

const geocode = (query, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=855ca02bdf32404c75ca4e6a4d58b5b8&query=' + query
	request({url , json:true},(error,{body}) => {
		// console.log(body)
		if(error) {
			callback('Please check your internet connection',undefined)
		} else if(body.error){
			// const error_res = JSON.parse(body);
			callback(body.error.info,undefined)
		} else {
			// const data = JSON.parse(body);
			callback(undefined,body.current)
		}
	});
};

module.exports = (
					geocode
				)
