'use strict'

import Emitter from '../helpers/Emitter.es6.js';
import Storage from '../helpers/Storage.es6.js'
import Place from './Place.es6.js';

export default class extends Emitter {
	constructor() {
		super();

		this.places = new Map();
		this.storage = new Storage();
	}

	get length() {
		return this.places.size;
	}

	add( placeDef ) {
		if ( Array.isArray( placeDef ) ) {
			for ( let p of placeDef ) {
				this.add( p );
			}

			return;
		}

		var place = new Place( placeDef );

		this.places.set( place.id, place );
		this.syncStorage();

		this.fire( 'place:add', place.id, place );
		console.log( '[PlaceCollection: place added]', placeDef );
	}

	addSample() {
		this.add( [
			{
				name: 'Wrocław',
				desc: 'Lots of dwarves, lots of bridges.',
				rating: 5,
				lat: 51.10789,
				lng: 17.03854
			},
			{
				name: 'Warszawa',
				desc: 'The capital and largest city of Poland.',
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
	}

	remove( placeId ) {
		this.places.delete( placeId );
		this.syncStorage();

		this.fire( 'place:remove', placeId );
		console.log( '[PlaceCollection: place removed]', placeId );
	}

	removeAll() {
		for ( let [ id ] of this ) {
			this.remove( id );
		}
	}

	get( placeId ) {
		return this.places.get( placeId );
		console.log( '[PlaceCollection: place retrieved]', placeId );
	}

	update( placeDef ) {
		Object.assign( this.get( placeDef.id ), placeDef );
		this.syncStorage();
	}

	getAll() {
		return this.places;
	}

	*[Symbol.iterator]() {
		for ( let [ k, v ] of this.places ) {
			yield [ k, v ];
		}
	}

	loadStorage() {
		var places = this.storage.get( 'places' );

		if ( places ) {
			this.add( places );
		}
	}

	syncStorage() {
		var serialized = [];

		for ( let [ , place ] of this ) {
			serialized.push( place.model )
		}

		this.storage.set( 'places', serialized );
	}
};