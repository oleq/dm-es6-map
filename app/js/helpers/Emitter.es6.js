'use strict'

export default class {
	constructor() {
		this.callbacks = {};
	}

	on( eventName, callback, context ) {
		callback = callback.bind( context || this );

		if ( this.callbacks[ eventName ] ) {
			this.callbacks[ eventName ].push( callback );
		} else {
			this.callbacks[ eventName ] = [ callback ];
		}

		// console.log( '[Emitter: on]', eventName, this );
	}

	once( eventName, callback, context ) {
		var oneTimeCallback = function( ...eventData ) {
			callback.call( context || this, ...eventData );

			this.callbacks[ eventName ].splice( this.callbacks[ eventName ].indexOf( callback ), 1 );
		}.bind( this );

		if ( this.callbacks[ eventName ] ) {
			this.callbacks[ eventName ].push( oneTimeCallback );
		} else {
			this.callbacks[ eventName ] = [ oneTimeCallback ];
		}

		// console.log( '[Emitter: once]', eventName, this );
	}


	fire( eventName, ...eventData ) {
		var callbacks = this.callbacks[ eventName ];

		if ( !callbacks ) {
			return;
		}

		callbacks.map( c => c.call( this, ...eventData ) );
	}
};