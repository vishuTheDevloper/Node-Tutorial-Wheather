const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'vishal bhat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'vishal bhat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'vishal bhat'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error: "You must provide address"
         })
     }

     geocode(req.query.address, (error,{latitude = 0,longitude = 0,location = ""} = {}) => {
     if (error){
         return res.send({ error })
     }

     forecast(latitude,longitude,(error,forecastData) => {
     res.send({
       forecast: forecastData,
       location,
       address: req.query.address
    })
     })

     })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: "You must provide search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

//All wildcards Should be in last 
//It mean if urs contains /help/...  and after help the page is not avalable then use this
app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'vishal bhat',
        errorMessage:'Help Article Not Found'
    })
})


//It should be in last 
app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'vishal bhat',
        errorMessage:'Page Not Found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})