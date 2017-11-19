import el from './helpers.js';

var tgMonster = (function(){
    var self = {};

    var colors = ['extra', 'minny', 'spike', 'lou', 'other', 'thingy', 'magic', 'crystal', 'arou', 'zen', 'panda'];
    var colorLen = colors.length;
    var anims = 4;

    var props = {
        TypeCount: 3
    };

    function randomPos() {
        return Math.round(Math.random() * 200) - Math.round(Math.random() * 200);
    }

    self.GenerateMonster = function(deets) {
        var chosenClr = colors[Math.round(Math.random() * colorLen)];
        var newLeft = window.innerWidth / 2 + randomPos();
        var newTop = window.innerHeight / 2 + randomPos();
        var chosenMonst = Math.ceil(Math.random() * props.TypeCount);
        
        return {
            Type: chosenMonst,
            Position: {
                Top: newTop,
                Left: newLeft
            },
            Colour: chosenClr,
            SetPosition: SetPosition,
            BuildElement: BuildElement
        };
    };

    var Monster = function(existing) {
        // console.log(existing);
        return self.GenerateMonster(existing);
    };

    var SetPosition = function(top, left){
        this.Props.Position.Top = top;
        this.Props.Position.Left = left;
    };

    var BuildElement = function(monst, parent) {
        var newToDo = el("#template #monst" + monst.Monster.Type).cloneNode(true);
        var randomSpeed = Math.ceil(Math.random() * anims);
 
 newToDo.id = monst.id;
 newToDo.classList.add('delay-' + randomSpeed);
 //        // newToDo.attr('id', monst.id).addClass('delay-' + randomSpeed);
        newToDo.querySelector('.mbody').classList.add(monst.Monster.Colour);
        console.log(newToDo);
        parent.appendChild(newToDo);
 //        newToDo.appendTo(parent);
        
 //        newToDo.css({ top: monst.Monster.Position.Top, left: monst.Monster.Position.Left });
        return newToDo;
    };

    return Monster;
})();

export default tgMonster;
