function AktivJS(server_prefix){
    this.server_prefix = server_prefix;
    this.activeComponents = [];
}

AktivJS.prototype.internal_createKey = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

AktivJS.prototype.reconfig = function(sp){
    this.server_prefix = sp;
};

AktivJS.prototype.makeHCR = function(data){
    var id = this.internal_createKey();
    this.activeComponents.push({
        key: id,
        value: data
    });

    return this.server_prefix + id;
};

AktivJS.prototype.makeHCR = function(id, data){
    this.activeComponents.push({
        key: id,
        value: data
    });

    return this.server_prefix + id;
};

AktivJS.prototype.getHCR = function(key){
    for(var i = 0; i < this.activeComponents.length; i++){
        if(this.activeComponents[i].key === key){
            return this.activeComponents[i].value;
        }
    }
    return null;
};

AktivJS.prototype.editHCR = function(key, data){
    for(var i = 0; i < this.activeComponents.length; i++){
        if(this.activeComponents[i].key == key){
            this.activeComponents[i].value = data;
        }
    }
};

AktivJS.prototype.deleteHCR = function(key){
    for(var i = 0; i < this.activeComponents.length; i++){
        if(this.activeComponents[i].key == key){
            this.activeComponents.splice(i, 1);
        }
    }
};

exports.AktivJS = AktivJS;