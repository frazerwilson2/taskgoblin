import tgStorage from './storage.js';
import tgMonster from './monster.js';

var tgUiFuncs = (function(){

var storage = new tgStorage("dragToDoRecs", []);
console.log(storage);
var toDoRecords = null;

function setPeps() {
    $('#toDoHolder .pep').pep({
        //constrainTo: 'window',
        useBoundingClientRect: true,
        rest: function() {
            var thisEl = this.el;
            var toDoId = $(thisEl).attr('id');
            setToDoPos($(thisEl).position(), toDoId);
            var winX = window.innerWidth;
            var winy = window.innerHeight;
            var boxX = $(thisEl).position().left;
            var boxY = $(thisEl).position().top;
            if (boxX > winX || boxX < 0 || boxY > winy || boxY < 0) {
                $(thisEl).remove();
                removeToDo(toDoId);
            }
        }
    });
}

function addNewItem(value) {
    if (!value) { return }
    var newId = Date.now();

    var chosenMonst = new tgMonster();

    var newToDoObj = { id: newId, name: value, Monster: chosenMonst };
    toDoRecords.push(newToDoObj);
    storage.Store(toDoRecords);
    bindBgClass(toDoRecords.length);

    buildToDoMonster(newToDoObj);

    setPeps();
    $('#toDoItem').val("");
}

function onNewItemSubmit() {
    var inputVal = $.trim($('#toDoItem').val());
    if (!inputVal) {
        console.log('no name given');
        return;
    }
    addNewItem(inputVal);
}

function setToDoPos(pos, id) {
    for (var i = 0; i < toDoRecords.length; i++) {
        if (toDoRecords[i].id === parseInt(id)) {
            toDoRecords[i].Monster.SetPosition(pos.top, pos.left);
        }
    }

    storage.Store(toDoRecords);
}

function removeToDo(id) {
    for (var i = 0; i < toDoRecords.length; i++) {
        if (toDoRecords[i].id === parseInt(id)) {
            toDoRecords.splice(i, 1);
        }
    }

    storage.Store(toDoRecords);
    console.log(toDoRecords.length);
    bindBgClass(toDoRecords.length);
}

function randomPos() {
    return Math.round(Math.random() * 200) - Math.round(Math.random() * 200);
}

function buildToDoMonster(item) {
    var newToDo = item.Monster.BuildElement(item.id, $('#toDoHolder'));
    newToDo.children('.name').children('span').html(item.name);
}

$(document).ready(function() {
    toDoRecords = storage.Retrieve();
    bindBgClass(toDoRecords.length);
    $('#textList').hide();
    if (toDoRecords) {
        toDoRecords.forEach(function(item) {
            item.Monster = new tgMonster(item.Monster);
            buildToDoMonster(item);
        });

        setPeps();
        $('#toDoItem').focus();
    }
});

function bindBgClass (num) {
    $('body').removeClass('sunset');
    $('body').removeClass('evening');
    var numClass;
    if(num > 3){
        numClass = 'sunset';
    }
    if(num > 5){
        numClass = 'evening';
    }
    $('body').addClass(numClass);
}

$('input').on('keyup', function(e) {
    if ($("input").is(":focus") && (e.keyCode === 13)) {
        onNewItemSubmit();
    }
});

$('#action .toggle').on('click', function(){
    if($('#action').hasClass('open')){
        $('#action').removeClass('open');
    }
    else {
        $('#action').addClass('open');    
        $('#toDoItem').focus();
    }
});

function toggleViews() {
    $('#textList').toggle();
    $('#toDoHolder').toggle();
}

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('sw.js')
//         .then(function() { console.log('Service Worker Registered'); });
// }

})();

export default tgUiFuncs;