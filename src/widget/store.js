var store = {};

var storage;

var doc = document;

function serialize(value) {
	return JSON.stringify(value);
}

function deserialize(value) {

	if (typeof value != 'string') return undefined;

	return JSON.parse(value);
}

if ('localStorage' in window && window.localStorage) {

	storage = window.localStorage;

	store.set = function(key, val) {
		storage[key] = serialize(val);
	}
	store.get = function(key) {
		return deserialize(
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

			storage = deserialize(window.name);

		} else {

			storage = {};

		}

		storage[key] = val;

		window.name = serialize(storage);

	}
	store.get = function(key) {

		return deserialize(window.name)[key];

	}
	store.remove = function(key) {

		storage = deserialize(window.name);

		delete storage[key];

		window.name = serialize(storage);

	}
	store.clear = function() {

		window.name = '';

	}
}

export default store;


