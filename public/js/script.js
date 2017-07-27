$(function () {
  // const $newUserForm = $('#newUserForm')

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 1.352083, lng: 103.819836}
  })
  var geocoder = new google.maps.Geocoder()

  let locations = [
        {lat: 1.304094, lng: 103.831874},
        {lat: 1.303841, lng: 103.833052},
        {lat: 1.304409, lng: 103.834001},
        {lat: 1.352585, lng: 103.835212},
        {lat: 1.312456, lng: 103.854821},
        {lat: 1.316181, lng: 103.764938}
  ]

  locations.forEach(function (locations) {
    var marker = new google.maps.Marker({
      position: locations,
      map: map
    })
  })

  document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map)
  })

  function geocodeAddress (geocoder, resultsMap) {
    var address = document.getElementById('address').value
    var qString = `${address}+singapore`
    geocoder.geocode({'address': qString}, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location)
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }
})
