'use strict';

var i = 0;
export function nextNumber() {
	return ++i;
}

export function elementFromString( str ) {
	var div = document.createElement( 'div' );
	div.innerHTML = str;
	return div.childNodes[ 0 ];
}

export function extend( obj1, obj2 ) {
	for ( let i in obj2 ) {
		if ( obj2.hasOwnProperty( i ) ) {
			obj1[ i ] = obj2[ i ];
		}
	}
}