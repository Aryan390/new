function initMap() {
  const overlay = document.getElementById('overlay')
  const ui = document.getElementById('ui-component')

  let officePos = { lat: 50.438284, lng: 30.515339 };
  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: officePos
  });
  let markerOffice = new google.maps.Marker({
      position: officePos,
      map: map,
      label: 'M'
  });


  // add marker function for multiple user selection
  function addMarker(coords){
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
    })

    // event listener for opening an overlay for a particular marker point
    marker.addListener('click',function(){
      ui.classList.remove('invisible')
      overlay.classList.remove('invisible')
    })
  }

  google.maps.event.addListener(map, 'click' ,function(event){
    addMarker(event.latLng)
    console.log(event.latLng);
  })

  // event listener for DOM elements
  overlay.addEventListener('click',function(){
    ui.classList.add('invisible')
    overlay.classList.add('invisible')
  })
}