'use strict';

import PlaceCollection from './models/PlaceCollection.es6.js';
import PlaceList from './views/PlaceList.es6.js';
import Map from './views/Map.es6.js';

var placeCollection = new PlaceCollection();

var list = new PlaceList( {
	ui: {
		list: 'list',
		showAll: 'showAll',
		removeAll: 'removeAll',
		addSample: 'addSample'
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
list.on( 'remove:all', placeCollection.removeAll, placeCollection );
list.on( 'add:sample', placeCollection.addSample, placeCollection );
list.on( 'add:sample', map.panToAllMarkers, map );

map.on( 'place:save', placeCollection.update, placeCollection );
map.on( 'place:move', placeCollection.update, placeCollection );
map.on( 'place:remove', placeCollection.remove, placeCollection );
map.on( 'place:create', placeCollection.add, placeCollection );

placeCollection.loadStorage();

if ( !placeCollection.length ) {
	placeCollection.addSample();
}

map.panToAllMarkers();