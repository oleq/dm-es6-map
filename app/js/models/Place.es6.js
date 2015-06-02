'use strict'

import { nextNumber } from '../helpers/helpers.es6.js'
import Model from './Model.es6.js';

export default class extends Model {
	constructor( placeDef ) {
		super();

		console.log( '[Place: create]', placeDef );

		Object.defineProperty( this, 'latLng', {
			get() {
				return new google.maps.LatLng( this.lat, this.lng );
			}
		} );

		Object.defineProperty( this, 'model', {
			get() {
				return {
					id: this.id,
					name: this.name,
					desc: this.desc,
					rating: this.rating,
					lat: this.lat,
					lng: this.lng
				};
			}
		} );

		this.on( 'change', function( ...eventData ) {
			console.log( '[Place: model change]', ...eventData );
		} );

		for ( let d in placeDef ) {
			this.set( d, placeDef[ d ] );
		}

		this.id = nextNumber();
	}
};