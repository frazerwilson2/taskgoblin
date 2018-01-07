import el from './helpers.js';
import tgStorage from './storage.js';

var anims = 4;

const monsterUI = {

	buildToDoMonster: function (item) {
	    // console.log(item);
	    var newToDo = monsterUI.BuildElement(item, el('#toDoHolder'));
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
	},
    BuildElement: function(monst, parent) {
	    var newToDo = el("#template #monst" + monst.Monster.Type).cloneNode(true);
	    var randomSpeed = Math.ceil(Math.random() * anims);

		newToDo.id = monst.id;
		newToDo.classList.add('delay-' + randomSpeed);
		//// newToDo.attr('id', monst.id).addClass('delay-' + randomSpeed);
	    newToDo.querySelector('.mbody').classList.add(monst.Monster.Colour);
	    parent.appendChild(newToDo);
		//newToDo.appendTo(parent);  
		//newToDo.css({ top: monst.Monster.Position.Top, left: monst.Monster.Position.Left });
    	return newToDo;
    }
}

export default monsterUI;