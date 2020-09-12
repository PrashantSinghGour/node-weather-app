console.log('client side js loaded!');

const form = document.querySelector('form')
const search = document.querySelector('input')
const weatherMessage = document.querySelector('#weather')
const error = document.querySelector('#error')


fetchWeather = ((address) => {
fetch('/weather?address='+address).then((res) => {
  res.json().then((data)=> {
    error.textContent = ''
    if(data.error) {
      error.textContent = data.error
      weatherMessage.textContent=''
    }
     
    console.log(data)
    weatherMessage.textContent = data.weatherinfo
  })
})
})



weatherMessage.textContent = 'hello'

form.addEventListener('submit', (e)=> {
  e.preventDefault();
  const location = search.value
  fetchWeather(location)
  console.log(location)
})