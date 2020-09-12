const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//port for heroku || fallback
const port = process.env.PORT || 3000

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


// Setup handlebar engine and views location
app.set('view engine', 'hbs')   
app.set('views', viewsPath)   
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))      

app.get('/', (req, res)=> {
  res.render('index.hbs',
  {
    title: 'Weather App',
    name: 'Prashant Singh'
  })  
})

app.get('/about', (req, res)=> {
  res.render('about', {
    title: 'About Page',
    name: 'Prashant Singh'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title:'Help page',
    message:'This is help page message!',
    name: 'Prashant Singh'
  })
})

app.get('/about', (req, res)=> {                // html host
  res.send('<h1>About Server</h1>')
})

app.get('/weather', (req, res)=>{

  if(!req.query.address) {
    return res.send({
      error:'Address must be passed for getting weather!'
    })
  }
  
  const address = req.query.address
  
  geocode(address, (error, {latitude, logitude, placeName:location} = {})=> {
    if(error) {
      return res.send({
        error
      })
    } 
  
      forecast(latitude, logitude, (error, forecastData) => {
        if(error) {
          return res.send({
            error
          })
        }
        
      const dataGet = { 
          location: location,
        weatherinfo:forecastData
      }
      return res.send({
        ...dataGet
      })
  })
  })
})

app.get('/help/*', (req, res)=> {
 res.render('404', {
   title:'404 page',
   message: 'Help article not found',
   name:'Prashant singh'
 })
})

app.get('*', (req, res) => {
  res.render('404', {
    title:'404 page',
    message: 'Page not found',
    name:'Prashant singh'
  })
})

app.listen(port, ()=>{
  console.log('Server is up on port'+ port + '.')
})