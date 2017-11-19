import tgStorage from './storage.js';
import interact from 'interactjs';
import tgMonster from './monster.js';
import el from './helpers.js';
import opts from './interactOpts.js';
import monsterUI from './monsterui.js';

var tgUiFuncs = (function(){

var toDoRecords = null;

function setInteract(){
    interact('.tg').draggable(opts);
}

function addNewItem(value) {
    if (!value) { return }
    var newId = Date.now();
    var newToDoObj = { id: newId, name: value };
    newToDoObj.Monster = new tgMonster()
    toDoRecords = toDoRecords || [];
    toDoRecords.push(newToDoObj);
    tgStorage.Store(toDoRecords);
    monsterUI.bindBgClass(toDoRecords.length);

    monsterUI.buildToDoMonster(newToDoObj);
    setInteract();
    el('#toDoItem').value = "";
}

function onNewItemSubmit() {
    var inputVal = el('#toDoItem').value;
    if (!inputVal) {
        console.log('no name given');
        return;
    }
    addNewItem(inputVal);
}

document.addEventListener("DOMContentLoaded", function(event) {
    toDoRecords = tgStorage.Retrieve();
    if(toDoRecords){
        monsterUI.bindBgClass(toDoRecords.length);
        toDoRecords.forEach(function(item) {
            item.Monster = new tgMonster(item.Monster);
            monsterUI.buildToDoMonster(item);
            monsterUI.SetPosition(item.id, item.Monster.Position);
            setInteract();
        });

        // setPeps();
        el('#toDoItem').focus();
    }
});

el('#toDoItem').addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        onNewItemSubmit();
    }
});

el('#submitDoTo').addEventListener("click", function(){
    onNewItemSubmit();
});

el('#action .toggle').addEventListener("click", function(){
    if(el('#action').classList.contains('open')){
        el('#action').classList.remove('open');
    }
    else {
        el('#action').classList.add('open');    
        el('#toDoItem').focus();
    }
});

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('sw.js')
//         .then(function() { console.log('Service Worker Registered'); });
// }

})();

export default tgUiFuncs;