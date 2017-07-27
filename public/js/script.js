$(function () {
  // const $newUserForm = $('#newUserForm')
  var $found = $("#found")
  var geo = ""

  $found.on('click', ".addBttn", function (e) {
    e.preventDefault()

    const theBttn = $(this)
    var target = e.currentTarget.dataset
    geo = target.geometry
    var updatedUser = {
      id: target.id,
      name: target.name,
      geometry: target.geometry
    }
    //
    // console.log('sending new place', updatedUser)
    $.post('/users/updateUser', updatedUser)
     .done(function (data) {
       console.log(data)
       if (data.status === 'ok') {
         alert('Ready! ' + data.message)
       }
     })
  })

  // function initMap () {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    streetViewControl: false,
    center: {lat: 1.352083, lng: 103.819836}
  })
  var geocoder = new google.maps.Geocoder()

  let locations = [
        // {geometry}
        // {lat: 1.303841, lng: 103.833052},
        // {lat: 1.304409, lng: 103.834001},
        // {lat: 1.352585, lng: 103.835212},
        // {lat: 1.312456, lng: 103.854821},
        {lat: 1.316181, lng: 103.764938}
  ]

  locations.forEach(function (locations) {
    var markers = new google.maps.Marker({
      position: locations,
      map: map
    })
  })
// }

  // for (var i = 0; i < secretMessages.length; ++i) {
  //   var markers = new google.maps.Marker({
  //     position: locations[i],
  //     map: map
  //   })
  //   attachSecretMessage(marker, secretMessages[i])
  // }
  //
  //    // Attaches an info window to a marker with the provided message. When the
  //    // marker is clicked, the info window will open with the secret message.
  // function attachSecretMessage (marker, secretMessage) {
  //   var infowindow = new google.maps.InfoWindow({
  //     content: secretMessage
  //   })
  //
  //   marker.addListener('click', function () {
  //     infowindow.open(marker.get('map'), marker)
  //   })
  // }
  //
  // var infowindow = new google.maps.InfoWindow({
  //   maxWidth: 160
  // })
}) // closing for $function

// document.getElementById('submit').addEventListener('click', function () {
//   geocodeAddress(geocoder, map)
// })
//
// function geocodeAddress (geocoder, resultsMap) {
//   var address = document.getElementById('address').value
//   var qString = `${address}+singapore`
//   geocoder.geocode({'address': qString}, function (results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location)
//       var markers = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       })
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status)
//     }
//   })
// }
