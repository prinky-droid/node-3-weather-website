const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000 

const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views',viewPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath)

app.get('',(req,res) => {
	res.render('index',{
		title : 'Weather app',
		name : 'priyanka',
		helpText: 'Welcome to weather page'
	})
})

app.get('/about',(req,res) => {
	res.render('about', {
		title : 'About',
		name : 'priyanka',
		helpText: 'This is about page',
	})
});

app.get('/about/*', (req,res) => {
	res.render('404', {
		title : '404',
		name : 'priyanka',
		errorMsg : 'About article not found.'
	})
})

app.get('/help',(req,res) => {
	res.render('help', {
		title : 'Help page',
		name : 'priyanka',
		helpText: 'This is some helpful text.'
	});
});

app.get('/help/*', (req,res) => {
	res.render('404', {
		title : '404',
		name : 'priyanka',
		errorMsg : 'Help article not found.'
	})
})


app.get('/weather',(req,res) => {
	// console.log(req.query)
	if(!req.query.address) {
		return res.send({
			errorMsg : 'Address is required'
		})
	}

	geocode(req.query.address, (error,geoData) => {
		if(error) {
			return res.send({
				errorMsg : error
			})
		}
		forecast.forecast(req.query.address,geoData, (error,forecastData) => {
			if(error) {
				return res.send({
					errorMsg : error
				})
			}
			console.log('Geocode data is ');
			console.log(geoData);
			console.log('Forcast data is ');
			console.log(forecastData.sunhour);
			console.log(forecastData.date);

			res.send({
				Geocode : geoData,
				address : req.query.address,
				sunhour : forecastData.sunhour,
				date : forecastData.date
			})
		})
	})
	/*res.send({
		location : 'India',
		forecast : 'warm',
		address : req.query.address
	})*/
})

app.get('*',(req,res) => {
	res.render('404', {
		title : '404',
		name : 'priyanka',
		errorMsg : 'Page not found....'
	})
});

/*app.get('', (req, res) => {
	res.send('<h1>Hello my first express</h1>')
});*/

/*app.get('/home',(req, res) => {
	res.send([{
		name : 'priyanka',
		age :28
	},{
		name : 'vidya',
		age : 26
	}])
})

app.get('/about', (req, res) => {
	res.send('<h1>About page</h1>')
})*/

/*app.get('/weather', (req, res) => {
	res.send([{
		forecast : 'climate'
	},{
		location : 'India'
	}])
})*/

app.listen(port,() => {
	console.log('Server is up now on ' + port)
})