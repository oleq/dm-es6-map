'use strict';

import { extend, elementFromString } from '../helpers/helpers.es6.js'
import View from './View.es6.js';

var formFieldsNames = [ 'id', 'name', 'desc', 'rating' ];
var formControlNames = [ 'save', 'remove' ];

export default class extends View {
	constructor( viewDef ) {
		extend( this, viewDef );
		super();

		this.ui.markers = {};
		this.ui.infoFormFields = {};
		this.ui.infoFormControls = {};

		this.model.on( 'place:add', this.addMarker, this );

		this.ui.map = new google.maps.Map( this.ui.mapContainer, {
			center: {
				lat: 51.91944,
				lng: 19.14514
			},
			zoom: 5
		} );

		google.maps.event.addListener( this.ui.map, 'click', function( event ) {
			var placeDef = {
				name: 'New place',
				desc: '',
				rating: 5,
				lat: event.latLng.lat(),
				lng: event.latLng.lng()
			};

			this.model.once( 'place:add', this.showInfoForm, this );

			this.fire( 'place:create', placeDef );
		}.bind( this ) );

		this.ui.infoForm = elementFromString( `<form>
			<dl class="mapForm">
				<dt><label for="name">Name</label></dt>
				<dd><input id="name" type="text" placeholder="Name of the place" value="" /></dd>

				<dt><label for="desc">Description</label></dt>
				<dd><textarea id="desc" rows="5" columns="120" placeholder="Short description"></textarea></dd>

				<dt><label for="rating">Rating</label></dt>
				<dd>
					<select id="rating" value="">
						${ [ 1, 2, 3, 4, 5 ].map( i => `<option value="${i}">${i}</option>` ).join( '' ) }
					</select> of 5
				</dd>
			</dl>
			<p>
				<button type="button" id="save">Save</button>
				<button type="button" id="remove">Remove</button>
			</p>
			<input id="id" type="hidden" value="" />
		</form>` );

		formFieldsNames.map( e => this.ui.infoFormFields[ e ] = this.ui.infoForm.elements.namedItem( e ) );
		formControlNames.map( e => this.ui.infoFormControls[ e ] = this.ui.infoForm.elements.namedItem( e ) );

		this.ui.infoFormControls.save.addEventListener( 'click', function() {
			this.fire( 'place:save', this.serializeInfoForm() );
			this.ui.infoWindow.close();
		}.bind( this ) );

		this.ui.infoFormControls.remove.addEventListener( 'click', function() {
			var id = this.getInfoFormFieldValue( 'id' );

			this.fire( 'place:remove', id );
			this.ui.infoWindow.close();
			this.removeMarker( id );
		}.bind( this ) );

		this.ui.infoWindow = new google.maps.InfoWindow( {
			content: this.ui.infoForm,
		} );
	}

	addMarker( placeId, placeDef ) {
		var marker = new google.maps.Marker({
			position: placeDef.latLng,
			map: this.ui.map,
			title: placeDef.name
		} );

		this.ui.markers[ placeId ] = marker;

		google.maps.event.addListener( marker, 'click', this.showInfoForm.bind( this, placeId ) );
	}

	removeMarker( placeId ) {
		this.ui.markers[ placeId ].setMap( null );
		delete this.ui.markers[ placeId ];
	}

	showInfoForm( placeId ) {
		var placeDef = this.model.get( placeId );

		this.ui.infoFormFields.name.value = placeDef.name;
		this.ui.infoFormFields.desc.value = placeDef.desc;
		this.ui.infoFormFields.rating.value = placeDef.rating;
		this.ui.infoFormFields.id.value = placeId;

   		this.ui.infoWindow.open( this.ui.map, this.getMarkerByPlaceId( placeId ) );

   		this.ui.infoFormFields.name.focus();
	}

	getInfoFormFieldValue( name ) {
		var value = this.ui.infoFormFields[ name ].value;

		if ( name in { rating: 1, id: 1 } ) {
			value = +value;
		}

		return value;
	}

	serializeInfoForm() {
		var values = {};

		formFieldsNames.map( e => values[ e ] = this.getInfoFormFieldValue( e ) );

		return values;
	}

	getMarkerByPlaceId( placeId ) {
		return this.ui.markers[ placeId ];
	}

	panToMarker( placeId ) {
		var marker = this.getMarkerByPlaceId( placeId );

		this.ui.map.panTo( marker.position );
		this.ui.map.setZoom( 15 );
		this.showInfoForm( placeId );
	}

	panToAllMarkers() {
		var bounds = new google.maps.LatLngBounds();

		this.model.forEach( function( place ) {
			bounds.extend( place.latLng );
		} );

		this.ui.infoWindow.close();
		this.ui.map.fitBounds( bounds );
	}
}


