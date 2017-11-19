var storageName = 'TaskGoblinLocal';

var tgStorage = {
    Store: function(value) {
        localStorage.setItem(storageName, JSON.stringify(value));
    },
    Retrieve: function() {
        var value = localStorage.getItem(storageName);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }
};

export default tgStorage;