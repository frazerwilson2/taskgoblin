var tgLocalDb = (function(){

const pub = {};

var db;

pub.Init = function(id){
    //check for support
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    var openRequest = indexedDB.open(`tm_db-${id}`, 1);

    openRequest.onupgradeneeded = function(e) {
      var db = e.target.result;
      // console.log('running onupgradeneeded');
      if (!db.objectStoreNames.contains('tasks')) {
        var storeOS = db.createObjectStore('tasks',
          {keyPath: 'id'});
      }
    };
    openRequest.onsuccess = function(e) {
      // console.log('running onsuccess');
      db = e.target.result;
      // addItem();
    };
    openRequest.onerror = function(e) {
      console.log('onerror!');
      console.dir(e);
    };
};

pub.addItem = function(item){
	console.log(item);
	var transaction = db.transaction(['tasks'], 'readwrite');
	var store = transaction.objectStore('tasks');

	let stringMons = JSON.stringify(item.Monster);

	var newItem = {
		id: item.id,
		name: item.name
	};

	var request = store.add(newItem);

	request.onerror = function(e) {
		console.log('Error', e.target.error.name);
	};

	request.onsuccess = function(e) {
		console.log('Woot! Did it');
	};
};

pub.AddGroup = function(group){
	// console.log('group>', group);
	group.forEach(item => pub.addItem(item));
}

return pub;

})();

export default tgLocalDb;