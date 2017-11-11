var tgStorage = function() {
    var self = {};

    self.Store = function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    self.Retrieve = function(key, defaultValue) {
        var value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }

        if (defaultValue) {
            return defaultValue;
        }

        return null;
    };

    var pub = function(key, defaultValue) {
        this.Key = key;
        this.Default = defaultValue;
    };

    pub.prototype.Store = function(value) {
        self.Store(this.Key, value);
    };

    pub.prototype.Retrieve = function() {
        return self.Retrieve(this.Key, this.Default);
    };

    return pub;
};

export default tgStorage;