// import tgStorage from './storage.js';
import tgMonster from './monster.js';
import el from './helpers.js';

var tgUiFuncs = (function(){

var toDoRecords = null;

// function setPeps() {
//     var pepList = document.querySelectorAll('#toDoHolder .pep');
//     for (var i = pepList.length - 1; i >= 0; i--) {
//         pepList[i].pep({
//             //constrainTo: 'window',
//             useBoundingClientRect: true,
//             rest: function() {
//                 var thisEl = this.el;
//                 var toDoId = el(thisEl).attr('id');
//                 setToDoPos(el(thisEl).position(), toDoId);
//                 var winX = window.innerWidth;
//                 var winy = window.innerHeight;
//                 var boxX = el(thisEl).position().left;
//                 var boxY = el(thisEl).position().top;
//                 if (boxX > winX || boxX < 0 || boxY > winy || boxY < 0) {
//                     el(thisEl).remove();
//                     removeToDo(toDoId);
//                 }
//             }
//         });
//     };
// }

function addNewItem(value) {
    if (!value) { return }
    var newId = Date.now();
    var newToDoObj = { id: newId, name: value };
    newToDoObj.Monster = new tgMonster()
// console.log(newToDoObj);
    toDoRecords = toDoRecords ? toDoRecords : [];
    toDoRecords.push(newToDoObj);
    // // tgStorage.Store(toDoRecords);
    // bindBgClass(toDoRecords.length);

    buildToDoMonster(newToDoObj);

    // // setPeps();
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

// function setToDoPos(pos, id) {
//     for (var i = 0; i < toDoRecords.length; i++) {
//         if (toDoRecords[i].id === parseInt(id)) {
//             toDoRecords[i].Monster.SetPosition(pos.top, pos.left);
//         }
//     }

//     // tgStorage.Store(toDoRecords);
// }

// function removeToDo(id) {
//     for (var i = 0; i < toDoRecords.length; i++) {
//         if (toDoRecords[i].id === parseInt(id)) {
//             toDoRecords.splice(i, 1);
//         }
//     }

//     // tgStorage.Store(toDoRecords);
//     console.log(toDoRecords.length);
//     bindBgClass(toDoRecords.length);
// }

function buildToDoMonster(item) {
    // console.log(item);
    var newToDo = item.Monster.BuildElement(item, el('#toDoHolder'));
    newToDo.querySelector('.name span').innerHTML = item.name;
}

document.addEventListener("DOMContentLoaded", function(event) {
    // toDoRecords = tgStorage.Retrieve();
    // if(toDoRecords){
    //     bindBgClass(toDoRecords.length);
    //     toDoRecords.forEach(function(item) {
    //         item.Monster = new tgMonster(item.Monster);
    //         // buildToDoMonster(item);
    //         // console.log(item.Monster);
    //     });

        // setPeps();
        // el('#toDoItem').focus();
    // }
});

// function bindBgClass (num) {
//     el('body').removeClass('sunset');
//     el('body').removeClass('evening');
//     var numClass;
//     if(num > 3){
//         numClass = 'sunset';
//     }
//     if(num > 5){
//         numClass = 'evening';
//     }
//     el('body').addClass(numClass);
// }

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