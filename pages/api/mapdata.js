import axios from 'axios';

export default function handler(req, res) {
    let placeId = req.query.placeId
    axios.post(`https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCn7YgQgOtNoSwAXJ_OQ-urMB5oNVq73cM&place_id=${placeId}`)
    .then(result => {
      res.send({result:result.data})
    })
}
