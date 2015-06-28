'use strict'

import { nextNumber } from '../helpers/helpers.es6.js'
import Model from './Model.es6.js';

export default class extends Model {
	constructor( placeDef ) {
		super();

		console.log( '[Place: create]', placeDef );

		this.on( 'change', function( property, value, oldValue ) {
			console.log( '[Place: model change]',
				`${property}: [ ${oldValue} => ${value} ]` );
		} );

		for ( let d in placeDef ) {
			this.set( d, placeDef[ d ] );
		}

		this.id = nextNumber.next().value;
	}

	get latLng() {
		return new google.maps.LatLng( this.lat, this.lng );
	}

	get model() {
		return {
			id: this.id,
			name: this.name,
			desc: this.desc,
			rating: this.rating,
			lat: this.lat,
			lng: this.lng
		};
	}
};