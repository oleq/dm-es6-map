'use strict';

import PlaceCollection from './models/PlaceCollection.es6.js';
import PlaceList from './views/PlaceList.es6.js';
import Map from './views/Map.es6.js';

var placeCollection = new PlaceCollection();

var list = new PlaceList( {
	ui: {
		list: 'list',
		showAll: 'showAll'
	},
	model: placeCollection
} );

var map = new Map( {
	ui: {
		mapContainer: 'map',
	},
	model: placeCollection
} );

list.on( 'show:place', map.panToMarker, map );
list.on( 'show:all', map.panToAllMarkers, map );

map.on( 'place:save', placeCollection.update, placeCollection );
map.on( 'place:remove', placeCollection.remove, placeCollection );

placeCollection.add( [
	{
		name: 'Wrocław',
		desc: 'Wrocław is the largest city in western Poland.',
		rating: 3,
		lat: 51.10789,
		lng: 17.03854
	},
	{
		name: 'Warszawa',
		desc: 'Warszawa is the capital and largest city of Poland.',
		rating: 2,
		lat: 52.22968,
		lng: 21.01223
	},
	{
		name: 'Gdańsk',
		desc: 'Ships and stuff.',
		rating: 4,
		lat: 54.35203,
		lng: 18.64664
	}
] );

map.panToAllMarkers();