var locData = {
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.216679096221924,
          53.13785076577429
        ]
      },
      "properties": {
        "id": "oldenburgerschloss",
        "name": "Oldenburger Schloss",
        "address": "Schlosspl. 1, 26122 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.198174400374683,
          53.14739463531575
        ]
      },
      "properties": {
        "id": "botanischergarten",
        "name": "Botanischer Garten",
        "address": "Philosophenweg 41, 26121 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.210292117928702,
          53.13400888772047
        ]
      },
      "properties": {
        "id": "schlossgarten",
        "name": "Schlossgarten Oldenburg",
        "address": "Schlossgarten Oldenburg 26122 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.219917956602103,
          53.140405132291534
        ]
      },
      "properties": {
        "id": "hafenoldenburg",
        "name": "Hafen Oldenburg",
        "address": "Hafenpromenade, 26135 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.234037104856498,
          53.1402378022538
        ]
      },
      "properties": {
        "id": "eisenbahnklappbruecke",
        "name": "Eisenbahn-Klappbrücke",
        "address": "Hunte, 26135 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.214723255070453,
          53.14457530113248
        ]
      },
      "properties": {
        "id": "horstjanssenmuseum",
        "name": "Horst-Janssen-Museum",
        "address": "Am Stadtmuseum 4-8, 26121 Oldenburg",
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          8.207685138615375,
          53.142850650770775
        ]
      },
      "properties": {
        "id": "kulturzentrumpfl",
        "name": "Kulturzentrum PFL",
        "address": "Peterstraße 3, 26121 Oldenburg",
      }
    },
  ]
}

// TOKEN AND CREATING MAP OBJECT

mapboxgl.accessToken =
  'pk.eyJ1IjoicGFibG9hbGJpYW4iLCJhIjoiY2p6Z3kxbDh1MGxlMzNob29yaDlqNnlrcCJ9.PkehJd3-j7LfVWsjkk8OzQ';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
  center: [8.213068, 53.140160], // starting coordinates
  zoom: 13
});

// Function to show all locations on sidebar

function buildLocationList(data) {
  // Iterating through the locations list
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    // 'prop' will store the properties of our current location element
    var prop = currentFeature.properties;
    // Selecting the list in the sidebar and create a div for each location
    var list = document.getElementById('list');
    var listing = list.appendChild(document.createElement('div'));
    listing.className = 'location';
    listing.id = 'location-' + i;

    // Creating a link for each location with the name as text
    var link = listing.appendChild(document.createElement('a'));
    link.href = "#";
    link.className = 'name';
    link.dataPosition = i;
    link.innerHTML = prop.name;

    // Creating a div for each location's address
    var address = listing.appendChild(document.createElement('div'));
    address.className = 'address'
    address.innerHTML = prop.address;
  }
}

//Function to show filtered locations on sidebar

function buildFilteredLocationList(data) {
  // Iterating through the filtered locations list
  for (i = 0; i < data.properties.length; i++) {
    var prop = data.properties[i];
    // Selecting the list in the sidebar and create a div for each location
    var list = document.getElementById('list');
    var listing = list.appendChild(document.createElement('div'));
    listing.className = 'location';
    listing.id = 'location-' + i;

    // Creating a link for each location with the name as text
    var link = listing.appendChild(document.createElement('a'));
    link.href = "#";
    link.className = 'name';
    link.dataPosition = i;
    link.innerHTML = prop.name;

    // Creating a div for each location's address
    var address = listing.appendChild(document.createElement('div'));
    address.className = 'address'
    address.innerHTML = prop.address;
  }
}

//Function to empty sidebar list

function emptyLocationList() {
  var list = document.getElementById('list');
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// ADD LOCATIONS TO MAP AND CREATE LIST ON SIDEBAR

map.on('load', function(e) {
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: locData
    },
    layout: {
      'icon-image': 'viewpoint-15',
      'icon-allow-overlap': true,
    }
  });
  buildLocationList(locData);
});

// FLY TO PLACE

if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function flyToPlace(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({
      closeOnClick: false
    })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
      '<h4>' + currentFeature.properties.address + '</h4>')
    .addTo(map);
}

// Event listener when user clicks on map
map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['locations']
  });
  if (features.length) {
    var clickedPoint = features[0];
    // Fly to the place
    flyToPlace(clickedPoint);
    // Close all other popups and display popup for clicked place
    createPopUp(clickedPoint);
    // Highlight place on sidebar
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }

    var selectedFeature = clickedPoint.properties.address;

    for (var i = 0; i < locData.features.length; i++) {
      if (locData.features[i].properties.address === selectedFeature) {
        selectedFeatureIndex = i;
      }
    }

    var listing = document.getElementById('location-' +
      selectedFeatureIndex);
    listing.classList.add('active');
  }

});

// Event listener when we write on filter field on sidebar
var inputField = document.querySelector('.input-filter');
inputField.addEventListener('keyup', function() {
  if (inputField.value){
    //empty here sidebar list
    emptyLocationList();

    var filteredData = {
       "type":"FeatureCollection",
       "properties": []
    }

    var currentInput = inputField.value.toLowerCase();

    turf.propEach(locData, function(currentProperties, featureIndex){
      var currentName = currentProperties.name.toLowerCase();


      console.log(currentName);
      if(currentName.startsWith(currentInput)) {
        filteredData.properties.push(currentProperties);
      }
    });
    buildFilteredLocationList(filteredData);
  } else {
    emptyLocationList();
    buildLocationList(locData);
  }
});
