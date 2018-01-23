import utils from './utils'

var store = {};

var storage;

var doc = document;


if (utils.isLocalStorageSupported()) {

	storage = window.localStorage;

	store.set = function(key, val) {
		storage[key] = utils.serialize(val);
	}
	store.get = function(key) {
		return utils.deserialize(
			storage[key]);
	}
	store.remove = function(key) {
		delete storage[key];
	}
	store.clear = function() {
		storage.clear();
	}

} else {

	store.set = function(key, val) {

		if (window.name) {

			storage = utils.deserialize(window.name);

		} else {

			storage = {};

		}

		storage[key] = val;

		window.name = utils.serialize(storage);

	}
	store.get = function(key) {

		if (window.name) {

			return utils.deserialize(window.name)[key];

		} else {

			return null

		}

	}
	store.remove = function(key) {

		storage = utils.deserialize(window.name);

		delete storage[key];

		window.name = utils.serialize(storage);

	}
	store.clear = function() {

		window.name = '';

	}
}

export default store;


