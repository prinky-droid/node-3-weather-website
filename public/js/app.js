console.log('Client side js file');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data)
	})
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	msgOne.textContent = 'Loading your data....'
	msgTwo.textContent = ' '
	const location = search.value
	fetch('http://localhost:3001/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if(data.errorMsg) {
				msgOne.textContent = 'Error'
				msgTwo.textContent = data.errorMsg
				// console.log(data.errorMsg)
			} else {
				msgOne.textContent = 'Data'
				msgTwo.textContent = JSON.stringify(data)
			}
		})
	})
	// console.log(location)
})