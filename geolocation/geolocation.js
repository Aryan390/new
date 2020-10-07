function initMap() {
  const overlay = document.getElementById('overlay')
  const ui = document.getElementById('ui-component')
  const remove = document.getElementById('remove-btn')
  const markerArr = []
  let currentMarker

  let officePos = { lat: 50.438284, lng: 30.515339 };
  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: officePos
  });
  let markerOffice = new google.maps.Marker({
      position: officePos,
      map: map,
      // label: 'M',
      icon: {
        url: './images/google-maps.svg',
        scaledSize: new google.maps.Size(50, 50)
      }
  });


  // add marker function for multiple user selection
  function addMarker(coords){
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
      animation: google.maps.Animation.DROP
      // draggable: true,
    })

    markerArr.push(marker)

    // event listener for opening an overlay for a particular marker point
    marker.addListener('click',function(){
      ui.classList.remove('invisible')
      currentMarker = marker
      overlay.classList.remove('invisible')
    })
    // console.log(markerArr)
  }

  // // sets the map on all markers in the array
  // function setMapOnAll(mapping){
  //   markerArr.forEach(marker =>{marker.setMap(mapping)})
  // }

  // later a function can be written for removing all the markers together

  google.maps.event.addListener(map, 'click' ,function(event){
    addMarker(event.latLng)
  })

  // event listener for DOM elements
  overlay.addEventListener('click',function(){
    ui.classList.add('invisible')
    overlay.classList.add('invisible')
  })

  // event listener on the remove-btn for removing the marker from the map and the array
  remove.addEventListener('click',function(){
    markerArr.forEach((marker,index) => {
      if(marker.position.lat() === currentMarker.position.lat() 
      && marker.position.lng() === currentMarker.position.lng()){
        markerArr.splice(index,1)
        marker.setMap(null)
        ui.classList.add('invisible')
        overlay.classList.add('invisible')
      }
    })
  })
}


// styles: [
//   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//       {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//       {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//       {
//         featureType: 'administrative.locality',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#d59563'}]
//       },
//       {
//         featureType: 'poi',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#d59563'}]
//       },
//       {
//         featureType: 'poi.park',
//         elementType: 'geometry',
//         stylers: [{color: '#263c3f'}]
//       },
//       {
//         featureType: 'poi.park',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#6b9a76'}]
//       },
//       {
//         featureType: 'road',
//         elementType: 'geometry',
//         stylers: [{color: '#38414e'}]
//       },
//       {
//         featureType: 'road',
//         elementType: 'geometry.stroke',
//         stylers: [{color: '#212a37'}]
//       },
//       {
//         featureType: 'road',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#9ca5b3'}]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry',
//         stylers: [{color: '#746855'}]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'geometry.stroke',
//         stylers: [{color: '#1f2835'}]
//       },
//       {
//         featureType: 'road.highway',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#f3d19c'}]
//       },
//       {
//         featureType: 'transit',
//         elementType: 'geometry',
//         stylers: [{color: '#2f3948'}]
//       },
//       {
//         featureType: 'transit.station',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#d59563'}]
//       },
//       {
//         featureType: 'water',
//         elementType: 'geometry',
//         stylers: [{color: '#17263c'}]
//       },
//       {
//         featureType: 'water',
//         elementType: 'labels.text.fill',
//         stylers: [{color: '#515c6d'}]
//       },
//       {
//         featureType: 'water',
//         elementType: 'labels.text.stroke',
//         stylers: [{color: '#17263c'}]
//       }

// ]