var MongoClient = require('mongodb').MongoClient;
var replicaSet = require("./variables");

MongoClient.connect(replicaSet.url, function(err, db) {
	if(!err) {
		var dbc = db.db(replicaSet.database).collection(replicaSet.collection);
		
		var yearArg = process.argv[2];
		var yearObj = {year: parseInt(yearArg, 10)};		
		var asc = -1;
		var desc = 1;
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];	
		
		dbc.find(yearObj).sort({ value: asc, month: desc}).limit(10).toArray(function(err, items) {
			if (err) throw err;
			if(items.length==0) console.log("\nNo data found in "+yearArg+" year!!!\n");
			else{			
				for(let i=0; i<10; i++){
					let string = (i+1) +")\tborough:\t\t\t\t"+items[i].borough + "\n\tmajor_category:\t\t\t\t"+items[i].major_category;
					string = string + "\n\tmajor_category:\t\t\t\t"+items[i].major_category + "\n\tnumber_occurences_in_month(value):\t"+items[i].value;
					string = string + "\n\tyear:\t\t\t\t\t"+items[i].year + "\n\tmonth:\t\t\t\t\t"+months[items[i].month -1];				
					console.log(string+"\n");
				}
			}
		});

		db.close();
	}  
});
