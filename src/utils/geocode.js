const request = require('request')
// sk.eyJ1IjoiYnZkZmIiLCJhIjoiY2t4cjZhcnc0MDFrMjJ3cGg5YXc5NHZpYiJ9.JUlJao62TizhpKDbBasMeg
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYnZkZmIiLCJhIjoiY2t4cjY2MWN2MHVmeTJ3cDQxMWQydTB5aSJ9.xt595HetmA9wkQIVRRl2Lg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode