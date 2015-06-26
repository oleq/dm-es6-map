'use strict';

export const nextNumber = ( function*() {
	let i = 0;

	while ( 1 ) {
		yield ++i;
	}
} )();

export function elementFromString( str ) {
	var div = document.createElement( 'div' );
	div.innerHTML = str;
	return div.childNodes[ 0 ];
}