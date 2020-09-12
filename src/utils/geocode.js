const request = require('request')

const getGeoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZm94dHJvdGFscGhhNyIsImEiOiJja2VoYWt2YXkxMWt0MnhtemJ6eXo5ZHU3In0.Q3j6vkjTzSbZf_hcYtb8Tw&limit=1'

  request({url:url, json:true}, (error,{body} = {})=> {
    if(error) {
      callback('Unable to connect to Geo code service', undefined)
    } else if(!body.features.length) {
callback('Please provide valid location', undefined)
    } else {
      const latitude = body.features[0].center[1]
          const longitude = body.features[0].center[0]
          const placeName = body.features[0].place_name
          data = {
            latitude: latitude,
            longitude: longitude,
            placeName: placeName
          }
          callback(undefined, data);
    }
  })
}

module.exports = getGeoCode