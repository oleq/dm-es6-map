'use strict'

import { extend, nextNumber } from '../helpers/helpers.es6.js'
import Emitter from '../helpers/Emitter.es6.js';
import Storage from '../helpers/Storage.es6.js'
import Place from './Place.es6.js';

export default class extends Emitter {
	constructor() {
		super();

		this.places = new Map();
		this.storage = new Storage();

		Object.defineProperty( this, 'length', {
			get() {
				return this.places.size;
			}
		} );
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

	remove( placeId ) {
		this.places.delete( placeId );
		this.syncStorage();

		this.fire( 'place:remove', placeId );
		console.log( '[PlaceCollection: place removed]', placeId );
	}

	get( placeId ) {
		return this.places.get( placeId );
		console.log( '[PlaceCollection: place retrieved]', placeId );
	}

	update( placeDef ) {
		extend( this.get( placeDef.id ), placeDef );
		this.syncStorage();
	}

	getAll() {
		return this.places;
	}

	forEach( callback ) {
		this.places.forEach( callback );
	}

	syncStorage() {
		var serialized = [];

		this.forEach( ( place, key ) => serialized.push( place.model ) );

		this.storage.set( 'places', serialized );
	}
};