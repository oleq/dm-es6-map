'use strict';

export default class {
	constructor() {
		this.storage = localStorage;
	}

	set( key, value ) {
		this.storage.setItem( key, JSON.stringify( value ) );
		console.log( '[Storage: set key]', key );
	}

	get( key ) {
		var value = this.storage.getItem( key );

		if ( value ) {
			value = JSON.parse( value );
		}

		console.log( '[Storage: get key]', key );

		return value;
	}
}