const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 300
//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebar enigne and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Edes Sulce'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Edes Sulce'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Edes Sulce'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,data) => {
        forecast(data.lat,data.lon,(err,dat) => {
            res.send({
                forecast: dat,
                location: data.location,
                address : req.query.address
            })
        })
    })
})


app.get('/products',(req,res) => {
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.rating)
    res.send({
        products: [],
    })

})

app.get('/help/*', (req,res) => {

    res.render('404',{
        title : 'Help article not found'
    })

})


app.get('*', (req,res) => {

    res.render('404',{
        title : 'Are you lost piece of shit?'
    })

})

app.listen(port, () => {
    console.log('Server is up on port 3005.')
})

