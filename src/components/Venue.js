import React from 'react'

export default function Venue(props) {
  const { id, name, fsq_id, location, categories, favorites, lat, long, tip_photo } = props.venue

  const distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit==="K") { dist = dist * 1.609344 }
        if (unit==="N") { dist = dist * 0.8684 }
        return dist;
    }
  }

  console.log('Venue props', props)

  return (
    <div className="card col-sm p-0 mb-2" data-fsq-id={fsq_id}>

      <img src={tip_photo} className="card-img-top border-0" alt="..." />
      <div className="card-body text-center">
        <h3 className="card-title">{name}</h3>
          <p className="text-black-50">
            <strong>
              <i className="fas fa-utensils pr-1"></i>
              {categories}
            </strong>
          </p>
        <div className="row mb-3">
          <span className="text-warning col-6">
            <strong>
              {favorites.length}
              <i className="fas fa-users pl-1"></i>
            </strong>
          </span>
          <span className="text-info col-6">
            <strong>
              <i className="fas fa-map-pin pr-1"></i>
              {parseFloat(distance(props.userLat, props.userLong, lat, long)).toFixed(2)} mi
            </strong>
          </span>
        </div>

        <p className="text-black-50">
          <small>
            {location}
          </small>
        </p>

        <div className="row justify-content-center text-center">
          <div className="col-6">
            <button
              className="btn btn-danger w-100"
              onClick={(event, venue) => props.handleLikeDislike(event, props.venue)}
              name="dislike"
              data-id={id}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success w-100"
              onClick={(event, venue) => props.handleLikeDislike(event, props.venue)}
              name="like"
              data-id={id}>
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
