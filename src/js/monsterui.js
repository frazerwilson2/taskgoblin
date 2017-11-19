import el from './helpers.js';
import tgStorage from './storage.js';

const monsterUI = {

	buildToDoMonster: function (item) {
	    // console.log(item);
	    var newToDo = item.Monster.BuildElement(item, el('#toDoHolder'));
	    newToDo.querySelector('.name span').innerHTML = item.name;
	},
	removeToDo: function (id, toDoRecords) {
	    for (var i = 0; i < toDoRecords.length; i++) {
	        if (toDoRecords[i].id === parseInt(id)) {
	            toDoRecords.splice(i, 1);
	        }
	    }
	    tgStorage.Store(toDoRecords);
	    console.log(toDoRecords.length);
	    monsterUI.bindBgClass(toDoRecords.length);
	},
	SetPosition: function(monst, pos){
		document.getElementById(monst).style.top = pos.Top + 'px';
		document.getElementById(monst).style.left = pos.Left + 'px';
console.log(monst, pos);
	},
	bindBgClass: function (num) {
	    el('body').classList.remove('sunset');
	    el('body').classList.remove('evening');
	    var numClass;
	    if(num > 3){
	        numClass = 'sunset';
	    }
	    if(num > 5){
	        numClass = 'evening';
	    }
	    el('body').classList.add(numClass);
	}

}

export default monsterUI;