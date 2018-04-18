var format = require('util').format;

var self = {
	host1: "localhost:27017",
	host2: "localhost:27018",
	host3: "localhost:27019",
	replicaSet: "rs0"
}
var url = format("mongodb://%s,%s,%s/?replicaSet=%s", self.host1, self.host2, self.host3, self.replicaSet);	
var	database =  "test";
var	collection =  "londoncrimes1";	

//module.exports.self = self;
module.exports.url = url;
module.exports.database = database;
module.exports.collection = collection;
