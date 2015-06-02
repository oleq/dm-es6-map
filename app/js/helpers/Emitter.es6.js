'use strict'

export default class {
	constructor() {
		this.callbacks = {};
	}

	on( eventName, callbackFn, context ) {
		callbackFn = callbackFn.bind( context || this );

		if ( this.callbacks[ eventName ] ) {
			this.callbacks[ eventName ].push( callbackFn );
		} else {
			this.callbacks[ eventName ] = [ callbackFn ];
		}

		console.log( '[Emitter: new event callback]', eventName, this );
	}

	fire( eventName, ...eventData ) {
		var eventCallbacks = this.callbacks[ eventName ];

		if ( !eventCallbacks ) {
			return;
		}

		for ( let c of eventCallbacks ) {
			c.call( this, ...eventData )
		}
	}
};