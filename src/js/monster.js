var tgMonster = function(){
    var self = {};

    var colors = ['extra', 'minny', 'spike', 'lou', 'other', 'thingy', 'magic', 'crystal', 'arou', 'zen', 'panda'];
    var colorLen = colors.length;
    var anims = 4;

    var props = {
        TypeCount: 3
    };

    self.GenerateMonster = function() {
        var chosenClr = colors[Math.round(Math.random() * colorLen)];
        var newLeft = $(window).width() / 2 + randomPos();
        var newTop = $(window).height() / 2 + randomPos();
        var chosenMonst = Math.ceil(Math.random() * props.TypeCount);
        
        return {
            Type: chosenMonst,
            Position: {
                Top: newTop,
                Left: newLeft
            },
            Colour: chosenClr
        };
    };

    var Monster = function(existing) {
        if(existing) {
            this.Props = existing.Props;
        }
        else {
            this.Props = self.GenerateMonster();
        }
    };

    Monster.prototype.SetPosition = function(top, left){
        this.Props.Position.Top = top;
        this.Props.Position.Left = left;
    };

    Monster.prototype.BuildElement = function(id, parent) {
        var newToDo = $("#template").find('#monst' + this.Props.Type).clone();
        var randomSpeed = Math.ceil(Math.random() * anims);
 
        $(newToDo).attr('id', id).addClass('delay-' + randomSpeed);
        $(newToDo).find('.mbody').addClass(this.Props.Colour);
        newToDo.appendTo(parent);
        
        newToDo.css({ top: this.Props.Position.Top, left: this.Props.Position.Left });
        return newToDo;
    };

    return Monster;
};

export default tgMonster;
