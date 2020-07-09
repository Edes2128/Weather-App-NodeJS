const request = require('request')


const forecast = (lat,lon,callback) => {

    const url2 = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=106288138f24dd296004cd7f2a258c48'
    request({url:url2,json:true},(error,response)=>{

        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{

            const main = response.body.main;
            const weather = response.body.weather;
            const data = {main,weather}
            callback('No error',data)

        }

    })

}

module.exports = forecast;