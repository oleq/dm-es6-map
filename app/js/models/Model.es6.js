'use strict'

import Emitter from '../helpers/Emitter.es6.js';

export default class extends Emitter {
	constructor() {
		super();

		Object.defineProperty( this, '_modelKeys', {
			value: {}
		} );
	}

	set( name, value ) {
		Object.defineProperty( this, name, {
			get() {
				return this._modelKeys[ name ];
			},

			set( value ) {
				var oldValue = this._modelKeys[ name ];

				if ( oldValue !== value ) {
					this._modelKeys[ name ] = value;
					this.fire( 'change:' + name, value, oldValue )
				}
			}
		} );

		this[ name ] = value;
	}
};