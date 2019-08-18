mapboxgl.accessToken = 'pk.eyJ1IjoicGFibG9hbGJpYW4iLCJhIjoiY2p6Z3kxbDh1MGxlMzNob29yaDlqNnlrcCJ9.PkehJd3-j7LfVWsjkk8OzQ';

var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: [8.213068, 53.140160], // starting position [lng, lat]
	zoom: 13
});