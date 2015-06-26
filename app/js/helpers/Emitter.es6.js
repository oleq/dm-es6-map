'use strict'

export default class {
	constructor() {
		this.callbacks = new Map();
	}

	on( eventName, callback, context = this ) {
		callback = callback.bind( context );

		if ( this.callbacks.has( eventName ) ) {
			this.callbacks.get( eventName ).add( callback );
		} else {
			this.callbacks.set( eventName, new Set( [ callback ] ) );
		}

		// console.log( '[Emitter: on]', eventName, this.callbacks.get( eventName ).size );
	}

	once( eventName, callback, context = this ) {
		var onceCallback = function( ...eventData ) {
			callback.call( context, ...eventData );

			this.callbacks.get( eventName ).delete( onceCallback );
		}.bind( this );

		if ( this.callbacks.has( eventName ) ) {
			this.callbacks.get( eventName ).add( onceCallback );
		} else {
			this.callbacks.set( eventName, new Set( [ onceCallback ] ) );
		}

		// console.log( '[Emitter: once]', eventName, this );
	}

	fire( eventName, ...eventData ) {
		if ( !this.callbacks.has( eventName ) ) {
			return;
		}

		this.callbacks.get( eventName ).forEach( c => c.call( this, ...eventData ) );
	}
};