var locData = {
  "type": "FeatureCollection",
  "features": [
    {
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

//MAP CREATION

mapboxgl.accessToken = 'pk.eyJ1IjoicGFibG9hbGJpYW4iLCJhIjoiY2p6Z3kxbDh1MGxlMzNob29yaDlqNnlrcCJ9.PkehJd3-j7LfVWsjkk8OzQ';

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
  center: [8.213068, 53.140160], // starting position [lng, lat]
  zoom: 13
});


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
});
