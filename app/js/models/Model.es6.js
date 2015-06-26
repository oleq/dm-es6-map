'use strict'

import Emitter from '../helpers/Emitter.es6.js';

export default class extends Emitter {
	constructor() {
		super();

		this.modelKeys = new Map();
	}

	set( name, value ) {
		Object.defineProperty( this, name, {
			get() {
				return this.modelKeys.get( name );
			},

			set( value ) {
				var oldValue = this.modelKeys.get( name );

				if ( oldValue !== value ) {
					this.modelKeys.set( name, value );
					this.fire( 'change', name, `was: ${oldValue}, is: ${value}` );
					this.fire( 'change:' + name, `was: ${oldValue}, is: ${value}` );
				}
			}
		} );

		this[ name ] = value;
	}
};