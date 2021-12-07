const distModal = document.getElementById('dist-modal')
const distBtn = document.getElementById('calcDistance')
const getDistBtn = document.getElementById('getDistance')
const result = document.getElementById('result')
const list = document.getElementById('list');
const selectedChecks = document.getElementById('selected-points')

// let apiKey = 'AIzaSyBSdJwCLjXwIH13M_T988PjRQX8N2KXLP0'
// apiKey = 'AIzaSyBcLQws5tAzPKlgi9RnMFs8LR7G1y4tQ_4'

// an array for holding all the markers
const markerArr = []

// an array to specifiy what points the user has selected for calculating distance between 2 points
const selectedPoints = []

// finally did it using a different api than the google geocoding api, but still awesome that it works, we can change the code though according to the client later, the baseline is that it works
function reverseGeocode(coords, marker){
  let apiString =`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat()}&longitude=${coords.lng()}&localityLanguage=en`

  console.log(coords.lat());
  let coordString = coords.lat() + "," + coords.lng()
  console.log(coordString);
  fetch(`https://api.distancematrix.ai/maps/api/geocode/json?latlng=${coordString}&key=md0mnuh2PRwthoVAuAPgrzFJE1u5P`)
    .then(res => res.json())
    .then(data => {
      // let placeArr = []
      // let place = data.localityInfo.administrative
      // place.forEach(item => {
      //   placeArr.push(
      //     {name: item.name, desc: item.description, code: item.isoCode}
      //   )
      // })
      // markerArr.push({marker, value: placeArr })
      // console.log(markerArr);
      
      const address = data.result[0].formatted_address
      markerArr.push({marker, value: address })
    })
    .catch(err => console.log(err))
}


// called by google map api script , this function is passed as a callback
function initMap() {
  const overlay = document.getElementById('overlay')
  const ui = document.getElementById('ui-component')
  const remove = document.getElementById('remove-btn')
  let currentMarker

  // main marker for the office
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

  // reverseGeocode(officePos, markerOffice)


  // add marker function for multiple user selection
  function addMarker(coords){
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
      animation: google.maps.Animation.DROP
      // draggable: true,
    })
    reverseGeocode(coords, marker)

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
    markerArr.forEach((item,index) => {
      if(item.marker.position.lat() === currentMarker.position.lat() 
      && item.marker.position.lng() === currentMarker.position.lng()){
        markerArr.splice(index,1)
        item.marker.setMap(null)
        ui.classList.add('invisible')
        overlay.classList.add('invisible')
      }
    })
    console.log(markerArr);
  })
}

// show distance modal with the current markers on the map
function showDistanceModal(){
  distModal.classList.toggle('invisible')

  if(distModal.classList.contains('invisible')) {
    distBtn.innerHTML = 'Calculate Distance'    
    return
  }
  distBtn.innerHTML = 'x'

  console.log(markerArr);

  markerArr.forEach(item => {
    let labelString = item.value

    const inputDiv = createInput(labelString);
    list.appendChild(inputDiv)
  })
}

// this function limits the checking of the 2 checkboxes in the whole list
function checkList (){
  const nodeList = document.querySelectorAll('.check')
  let truthVal = 0
  let selectedArr = []
  nodeList.forEach(item => {
    if(item.checked) {
      truthVal++
      selectedArr.push(item.value)
    }
  })

  // if more than 2 checkboxes are selected, then open up an error modal and remove all selects
  if(truthVal > 2) {
    nodeList.forEach(item => {
      item.checked = false
    })
    selectedArr = []
    console.log('please choose only upto 2 locations');
    selectedChecks.innerHTML = ''
    return
  }

  console.log('someting');
  selectedChecks.innerHTML = selectedArr.join(' AND ')

}

function createInput(labelString) {
  const container = document.createElement('div')
  const checkbox = document.createElement('input');
  checkbox.className = 'check'
  checkbox.addEventListener('click', checkList)
  checkbox.type = "checkbox";
  checkbox.name = "name";
  checkbox.value = labelString;
  checkbox.id = "id";

  const label = document.createElement('label')
  label.htmlFor = "id";
  label.appendChild(document.createTextNode(labelString));

  container.appendChild(checkbox);
  container.appendChild(label);

  return container
}

// function to calculate distance between 2 points
function calcDistance(){
  if(selectedChecks.innerHTML === '') return

  let address = selectedChecks.innerHTML

  address = address.split(' AND ')

  if(address.length < 2) {
    console.log('add 2 points to get the distance between them');
    return
  }

  const firstAddress =address[0]
  const secondAddress = address[1]

  let origin = '51.4822656,-0.1933769'
  let destination = '51.4994794,-0.1269979'
  let token = 'md0mnuh2PRwthoVAuAPgrzFJE1u5P'

  markerArr.forEach(item => {
    if(firstAddress === item.value) origin = item.marker.position.lat() + "," + item.marker.position.lng()  
    else if(secondAddress === item.value) destination = item.marker.position.lat() + "," + item.marker.position.lng()  
  })

  fetch(`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${token}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    let distance = data.rows[0].elements[0].distance.text
    let duration = data.rows[0].elements[0].duration.text
    result.innerHTML = distance + " - " + duration
  })
}

getDistBtn.addEventListener('click', calcDistance)
distBtn.addEventListener('click', showDistanceModal)