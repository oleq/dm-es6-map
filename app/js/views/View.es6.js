'use strict'

import Emitter from '../helpers/Emitter.es6.js';

export default class extends Emitter {
	constructor() {
		super();

		for ( let element in this.ui ) {
			this.ui[ element ] = document.getElementById( this.ui[ element ] );
		}
	}
};