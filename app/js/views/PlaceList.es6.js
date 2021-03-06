'use strict';

import { elementFromString } from '../helpers/helpers.es6.js'
import View from './View.es6.js';

export default class extends View {
	constructor( viewDef ) {
		Object.assign( this, viewDef );
		super();

		this.listItems = {};

		this.model.on( 'place:add', this.add, this );
		this.model.on( 'place:remove', this.remove, this );

		this.ui.showAll.addEventListener( 'click', function() {
			this.fire( 'show:all' );
		}.bind( this ) );

		this.ui.removeAll.addEventListener( 'click', function() {
			this.fire( 'remove:all' );
		}.bind( this ) );
	}

	add( placeId, placeDef ) {
		var listItem = elementFromString(
			`<li id="place-${placeId}" data-latlng="${placeDef.latLng}">
				<h2 class="place-name">${placeDef.name}</h2>
				<p class="place-desc">${placeDef.desc}</p>
				<p>
					Rating:
					<span class="place-rating place-rating-${placeDef.rating}">
						${ this.getRatingStars( placeDef.rating ) }
					</span>
				</p>
			</li>`
		);

		listItem.addEventListener( 'click', function() {
			this.fire( 'show:place', placeId );
		}.bind( this ) );

		placeDef.on( 'change:name', ( value ) => {
			listItem.querySelector( '.place-name' ).innerHTML = value;
		} );

		placeDef.on( 'change:desc', ( value ) => {
			listItem.querySelector( '.place-desc' ).innerHTML = value;
		} );

		placeDef.on( 'change:rating', ( value ) => {
			listItem.querySelector( '.place-rating' ).innerHTML = this.getRatingStars( value );
		} );

		this.listItems[ placeId ] = listItem;
		this.ui.list.appendChild( listItem );
	}

	remove( placeId ) {
		this.listItems[ placeId ].remove();
	}

	getRatingStars( rating ) {
		var stars = '';

		while ( rating-- > 0 ) {
			stars += '&#9733;'
		}

		return stars;
	}
}