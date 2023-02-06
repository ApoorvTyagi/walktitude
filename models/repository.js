const models = require('./User')

const Profile = models.Profile

async function fetchNearestWalker(coordinates, maxDistance) {
    return Profile.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }
    })
    .exec()
    .catch(error => {
        console.log(error);
    });
}

async function updateLocation(longitude, latitude, googleId) {
    return Profile.findOneAndUpdate({ googleId, $set: {location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
    }}, new:true })
    .exec()
    .catch(error => {
        console.log(error);
    });
}

module.exports = {
    fetchNearestWalker,
    updateLocation
}