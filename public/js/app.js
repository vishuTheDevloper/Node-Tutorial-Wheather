// console.log('Client side javascript file is loaded!')
//This Query Selector always Matches first Form,First Input etc
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//but if i want to change the selector on any paticular element the Below This Code
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    message1.textContent = "Loading..."
    message2.textContent = ""
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
response.json().then((data) => {
   if (data.error){
    message1.textContent = data.error
   }
   else{
    message1.textContent = data.location
    message2.textContent = data.forecast

   }
})
})
})
// https://weather-app-nodebyvishal.herokuapp.com/ | https://git.heroku.com/weather-app-nodebyvishal.git
