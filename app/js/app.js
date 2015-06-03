/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PlaceCollection = _interopRequire(__webpack_require__(1));

	var PlaceList = _interopRequire(__webpack_require__(7));

	var Map = _interopRequire(__webpack_require__(9));

	var placeCollection = new PlaceCollection();

	var list = new PlaceList({
		ui: {
			list: "list",
			showAll: "showAll",
			removeAll: "removeAll",
			addSample: "addSample"
		},
		model: placeCollection
	});

	var map = new Map({
		ui: {
			mapContainer: "map" },
		model: placeCollection
	});

	list.on("show:place", map.panToMarker, map);
	list.on("show:all", map.panToAllMarkers, map);
	list.on("remove:all", placeCollection.removeAll, placeCollection);
	list.on("add:sample", placeCollection.addSample, placeCollection);
	list.on("add:sample", map.panToAllMarkers, map);

	map.on("place:save", placeCollection.update, placeCollection);
	map.on("place:move", placeCollection.update, placeCollection);
	map.on("place:remove", placeCollection.remove, placeCollection);
	map.on("place:create", placeCollection.add, placeCollection);

	placeCollection.loadStorage();

	if (!placeCollection.length) {
		placeCollection.addSample();
	}

	map.panToAllMarkers();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _helpersHelpersEs6Js = __webpack_require__(2);

	var extend = _helpersHelpersEs6Js.extend;
	var nextNumber = _helpersHelpersEs6Js.nextNumber;

	var Emitter = _interopRequire(__webpack_require__(6));

	var Storage = _interopRequire(__webpack_require__(3));

	var Place = _interopRequire(__webpack_require__(4));

	var _default = (function (_Emitter) {
		var _class = function _default() {
			_classCallCheck(this, _class);

			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			this.places = new Map();
			this.storage = new Storage();

			Object.defineProperty(this, "length", {
				get: function get() {
					return this.places.size;
				}
			});
		};

		_inherits(_class, _Emitter);

		_createClass(_class, {
			add: {
				value: function add(placeDef) {
					if (Array.isArray(placeDef)) {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = placeDef[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var p = _step.value;

								this.add(p);
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator["return"]) {
									_iterator["return"]();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}

						return;
					}

					var place = new Place(placeDef);

					this.places.set(place.id, place);
					this.syncStorage();

					this.fire("place:add", place.id, place);
					console.log("[PlaceCollection: place added]", placeDef);
				}
			},
			addSample: {
				value: function addSample() {
					this.add([{
						name: "Wrocław",
						desc: "Lots of dwarves, lots of bridges.",
						rating: 5,
						lat: 51.10789,
						lng: 17.03854
					}, {
						name: "Warszawa",
						desc: "The capital and largest city of Poland.",
						rating: 2,
						lat: 52.22968,
						lng: 21.01223
					}, {
						name: "Gdańsk",
						desc: "Ships and stuff.",
						rating: 4,
						lat: 54.35203,
						lng: 18.64664
					}]);
				}
			},
			remove: {
				value: function remove(placeId) {
					this.places["delete"](placeId);
					this.syncStorage();

					this.fire("place:remove", placeId);
					console.log("[PlaceCollection: place removed]", placeId);
				}
			},
			removeAll: {
				value: function removeAll() {
					var _this = this;

					this.forEach(function (v, k) {
						return _this.remove(k);
					});
				}
			},
			get: {
				value: function get(placeId) {
					return this.places.get(placeId);
					console.log("[PlaceCollection: place retrieved]", placeId);
				}
			},
			update: {
				value: function update(placeDef) {
					extend(this.get(placeDef.id), placeDef);
					this.syncStorage();
				}
			},
			getAll: {
				value: function getAll() {
					return this.places;
				}
			},
			forEach: {
				value: function forEach(callback) {
					this.places.forEach(callback);
				}
			},
			loadStorage: {
				value: function loadStorage() {
					var places = this.storage.get("places");

					if (places) {
						this.add(places);
					}
				}
			},
			syncStorage: {
				value: function syncStorage() {
					var serialized = [];

					this.forEach(function (place, key) {
						return serialized.push(place.model);
					});

					this.storage.set("places", serialized);
				}
			}
		});

		return _class;
	})(Emitter);

	module.exports = _default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.nextNumber = nextNumber;
	exports.elementFromString = elementFromString;
	exports.extend = extend;
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	"use strict";

	var i = 0;

	function nextNumber() {
		return ++i;
	}

	function elementFromString(str) {
		var div = document.createElement("div");
		div.innerHTML = str;
		return div.childNodes[0];
	}

	function extend(obj1, obj2) {
		for (var _i in obj2) {
			if (obj2.hasOwnProperty(_i)) {
				obj1[_i] = obj2[_i];
			}
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _default = (function () {
		var _class = function _default() {
			_classCallCheck(this, _class);

			this.storage = localStorage;
		};

		_createClass(_class, {
			set: {
				value: function set(key, value) {
					this.storage.setItem(key, JSON.stringify(value));
					console.log("[Storage: set key]", key);
				}
			},
			get: {
				value: function get(key) {
					var value = this.storage.getItem(key);

					if (value) {
						value = JSON.parse(value);
					}

					console.log("[Storage: get key]", key);

					return value;
				}
			}
		});

		return _class;
	})();

	module.exports = _default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var nextNumber = __webpack_require__(2).nextNumber;

	var Model = _interopRequire(__webpack_require__(5));

	var _default = (function (_Model) {
		var _class = function _default(placeDef) {
			_classCallCheck(this, _class);

			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			console.log("[Place: create]", placeDef);

			Object.defineProperty(this, "latLng", {
				get: function get() {
					return new google.maps.LatLng(this.lat, this.lng);
				}
			});

			Object.defineProperty(this, "model", {
				get: function get() {
					return {
						id: this.id,
						name: this.name,
						desc: this.desc,
						rating: this.rating,
						lat: this.lat,
						lng: this.lng
					};
				}
			});

			this.on("change", function () {
				for (var _len = arguments.length, eventData = Array(_len), _key = 0; _key < _len; _key++) {
					eventData[_key] = arguments[_key];
				}

				console.log.apply(console, ["[Place: model change]"].concat(eventData));
			});

			for (var d in placeDef) {
				this.set(d, placeDef[d]);
			}

			this.id = nextNumber();
		};

		_inherits(_class, _Model);

		return _class;
	})(Model);

	module.exports = _default;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Emitter = _interopRequire(__webpack_require__(6));

	var _default = (function (_Emitter) {
		var _class = function _default() {
			_classCallCheck(this, _class);

			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			Object.defineProperty(this, "_modelKeys", {
				value: {}
			});
		};

		_inherits(_class, _Emitter);

		_createClass(_class, {
			set: {
				value: function set(name, value) {
					Object.defineProperty(this, name, {
						get: function get() {
							return this._modelKeys[name];
						},

						set: function set(value) {
							var oldValue = this._modelKeys[name];

							if (oldValue !== value) {
								this._modelKeys[name] = value;
								this.fire("change", name, value, oldValue);
								this.fire("change:" + name, value, oldValue);
							}
						}
					});

					this[name] = value;
				}
			}
		});

		return _class;
	})(Emitter);

	module.exports = _default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _default = (function () {
		var _class = function _default() {
			_classCallCheck(this, _class);

			this.callbacks = {};
		};

		_createClass(_class, {
			on: {
				value: function on(eventName, callback, context) {
					callback = callback.bind(context || this);

					if (this.callbacks[eventName]) {
						this.callbacks[eventName].push(callback);
					} else {
						this.callbacks[eventName] = [callback];
					}

					// console.log( '[Emitter: on]', eventName, this );
				}
			},
			once: {
				value: function once(eventName, callback, context) {
					var oneTimeCallback = (function () {
						for (var _len = arguments.length, eventData = Array(_len), _key = 0; _key < _len; _key++) {
							eventData[_key] = arguments[_key];
						}

						callback.call.apply(callback, [context || this].concat(eventData));

						this.callbacks[eventName].splice(this.callbacks[eventName].indexOf(callback), 1);
					}).bind(this);

					if (this.callbacks[eventName]) {
						this.callbacks[eventName].push(oneTimeCallback);
					} else {
						this.callbacks[eventName] = [oneTimeCallback];
					}

					// console.log( '[Emitter: once]', eventName, this );
				}
			},
			fire: {
				value: function fire(eventName) {
					var _this = this;

					for (var _len = arguments.length, eventData = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
						eventData[_key - 1] = arguments[_key];
					}

					var callbacks = this.callbacks[eventName];

					if (!callbacks) {
						return;
					}

					callbacks.map(function (c) {
						return c.call.apply(c, [_this].concat(eventData));
					});
				}
			}
		});

		return _class;
	})();

	module.exports = _default;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _helpersHelpersEs6Js = __webpack_require__(2);

	var elementFromString = _helpersHelpersEs6Js.elementFromString;
	var extend = _helpersHelpersEs6Js.extend;

	var View = _interopRequire(__webpack_require__(8));

	var _default = (function (_View) {
		var _class = function _default(viewDef) {
			_classCallCheck(this, _class);

			extend(this, viewDef);
			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			this.listItems = {};

			this.model.on("place:add", this.add, this);
			this.model.on("place:remove", this.remove, this);

			this.ui.showAll.addEventListener("click", (function () {
				this.fire("show:all");
			}).bind(this));

			this.ui.removeAll.addEventListener("click", (function () {
				this.fire("remove:all");
			}).bind(this));
		};

		_inherits(_class, _View);

		_createClass(_class, {
			add: {
				value: function add(placeId, placeDef) {
					var listItem = elementFromString("<li id=\"place-" + placeId + "\" data-latlng=\"" + placeDef.latLng + "\">\n\t\t\t\t<h2 class=\"place-name\">" + placeDef.name + "</h2>\n\t\t\t\t<p class=\"place-desc\">" + placeDef.desc + "</p>\n\t\t\t\t<p>\n\t\t\t\t\tRating:\n\t\t\t\t\t<span class=\"place-rating place-rating-" + placeDef.rating + "\">\n\t\t\t\t\t\t" + this.getRatingStars(placeDef.rating) + "\n\t\t\t\t\t</span>\n\t\t\t\t</p>\n\t\t\t</li>");

					listItem.addEventListener("click", (function () {
						this.fire("show:place", placeId);
					}).bind(this));

					placeDef.on("change:name", function (value) {
						listItem.querySelector(".place-name").innerHTML = value;
					});

					placeDef.on("change:desc", function (value) {
						listItem.querySelector(".place-desc").innerHTML = value;
					});

					placeDef.on("change:rating", function (value) {
						listItem.querySelector(".place-rating").innerHTML = this.getRatingStars(value);
					}, this);

					this.listItems[placeId] = listItem;
					this.ui.list.appendChild(listItem);
				}
			},
			remove: {
				value: function remove(placeId) {
					this.listItems[placeId].remove();
				}
			},
			getRatingStars: {
				value: function getRatingStars(rating) {
					var stars = "";

					for (var i = rating; i--;) {
						stars += "&#9733;";
					}

					return stars;
				}
			}
		});

		return _class;
	})(View);

	module.exports = _default;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Emitter = _interopRequire(__webpack_require__(6));

	var _default = (function (_Emitter) {
		var _class = function _default() {
			_classCallCheck(this, _class);

			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			for (var element in this.ui) {
				this.ui[element] = document.getElementById(this.ui[element]);
			}
		};

		_inherits(_class, _Emitter);

		return _class;
	})(Emitter);

	module.exports = _default;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _helpersHelpersEs6Js = __webpack_require__(2);

	var extend = _helpersHelpersEs6Js.extend;
	var elementFromString = _helpersHelpersEs6Js.elementFromString;

	var View = _interopRequire(__webpack_require__(8));

	var formFieldsNames = ["id", "name", "desc", "rating"];
	var formControlNames = ["save", "remove"];

	var _default = (function (_View) {
		var _class = function _default(viewDef) {
			var _this = this;

			_classCallCheck(this, _class);

			extend(this, viewDef);
			_get(Object.getPrototypeOf(_class.prototype), "constructor", this).call(this);

			this.ui.markers = {};
			this.ui.infoFormFields = {};
			this.ui.infoFormControls = {};

			this.model.on("place:add", this.addMarker, this);
			this.model.on("place:remove", this.removeMarker, this);

			this.ui.map = new google.maps.Map(this.ui.mapContainer, {
				center: {
					lat: 51.91944,
					lng: 19.14514
				},
				zoom: 5
			});

			google.maps.event.addListener(this.ui.map, "click", (function (event) {
				var placeDef = {
					name: "New place",
					desc: "",
					rating: 5,
					lat: event.latLng.lat(),
					lng: event.latLng.lng()
				};

				this.model.once("place:add", this.showInfoForm, this);

				this.fire("place:create", placeDef);
			}).bind(this));

			this.ui.infoForm = elementFromString("<form>\n\t\t\t<dl class=\"mapForm\">\n\t\t\t\t<dt><label for=\"name\">Name</label></dt>\n\t\t\t\t<dd><input id=\"name\" type=\"text\" placeholder=\"Name of the place\" value=\"\" /></dd>\n\n\t\t\t\t<dt><label for=\"desc\">Description</label></dt>\n\t\t\t\t<dd><textarea id=\"desc\" rows=\"5\" columns=\"120\" placeholder=\"Short description\"></textarea></dd>\n\n\t\t\t\t<dt><label for=\"rating\">Rating</label></dt>\n\t\t\t\t<dd>\n\t\t\t\t\t<select id=\"rating\" value=\"\">\n\t\t\t\t\t\t" + [1, 2, 3, 4, 5].map(function (i) {
				return "<option value=\"" + i + "\">" + i + "</option>";
			}).join("") + "\n\t\t\t\t\t</select> of 5\n\t\t\t\t</dd>\n\t\t\t</dl>\n\t\t\t<p>\n\t\t\t\t<button type=\"button\" id=\"save\">Save</button>\n\t\t\t\t<button type=\"button\" id=\"remove\">Remove</button>\n\t\t\t</p>\n\t\t\t<input id=\"id\" type=\"hidden\" value=\"\" />\n\t\t</form>");

			formFieldsNames.map(function (e) {
				return _this.ui.infoFormFields[e] = _this.ui.infoForm.elements.namedItem(e);
			});
			formControlNames.map(function (e) {
				return _this.ui.infoFormControls[e] = _this.ui.infoForm.elements.namedItem(e);
			});

			this.ui.infoFormControls.save.addEventListener("click", (function () {
				this.fire("place:save", this.serializeInfoForm());
				this.ui.infoWindow.close();
			}).bind(this));

			this.ui.infoFormControls.remove.addEventListener("click", (function () {
				var id = this.getInfoFormFieldValue("id");

				this.removeMarker(id);
				this.ui.infoWindow.close();
				this.fire("place:remove", id);
			}).bind(this));

			this.ui.infoWindow = new google.maps.InfoWindow({
				content: this.ui.infoForm });
		};

		_inherits(_class, _View);

		_createClass(_class, {
			addMarker: {
				value: function addMarker(placeId, placeDef) {
					var marker = new google.maps.Marker({
						position: placeDef.latLng,
						map: this.ui.map,
						title: placeDef.name,
						draggable: true
					});

					google.maps.event.addListener(marker, "dragend", (function (event) {
						this.fire("place:move", {
							id: placeId,
							lat: event.latLng.lat(),
							lng: event.latLng.lng()
						});

						this.showInfoForm(placeId);
					}).bind(this));

					this.ui.markers[placeId] = marker;

					google.maps.event.addListener(marker, "click", this.showInfoForm.bind(this, placeId));
				}
			},
			removeMarker: {
				value: function removeMarker(placeId) {
					this.getMarkerByPlaceId(placeId).setMap(null);
					delete this.ui.markers[placeId];
				}
			},
			showInfoForm: {
				value: function showInfoForm(placeId) {
					var placeDef = this.model.get(placeId);

					this.ui.infoFormFields.name.value = placeDef.name;
					this.ui.infoFormFields.desc.value = placeDef.desc;
					this.ui.infoFormFields.rating.value = placeDef.rating;
					this.ui.infoFormFields.id.value = placeId;

					this.ui.infoWindow.open(this.ui.map, this.getMarkerByPlaceId(placeId));

					this.ui.infoFormFields.name.focus();
				}
			},
			getInfoFormFieldValue: {
				value: function getInfoFormFieldValue(name) {
					var value = this.ui.infoFormFields[name].value;

					if (name in { rating: 1, id: 1 }) {
						value = +value;
					}

					return value;
				}
			},
			serializeInfoForm: {
				value: function serializeInfoForm() {
					var _this = this;

					var values = {};

					formFieldsNames.map(function (e) {
						return values[e] = _this.getInfoFormFieldValue(e);
					});

					return values;
				}
			},
			getMarkerByPlaceId: {
				value: function getMarkerByPlaceId(placeId) {
					return this.ui.markers[placeId];
				}
			},
			panToMarker: {
				value: function panToMarker(placeId) {
					var marker = this.getMarkerByPlaceId(placeId);

					this.panToPosition(marker.position, 15);
					this.showInfoForm(placeId);
				}
			},
			panToPosition: {
				value: function panToPosition(position, zoom) {
					this.ui.map.panTo(position);
					this.ui.map.setZoom(zoom);
				}
			},
			panToAllMarkers: {
				value: function panToAllMarkers() {
					var bounds = new google.maps.LatLngBounds();

					this.model.forEach(function (place) {
						bounds.extend(place.latLng);
					});

					this.ui.infoWindow.close();
					this.ui.map.fitBounds(bounds);
				}
			}
		});

		return _class;
	})(View);

	module.exports = _default;

/***/ }
/******/ ]);