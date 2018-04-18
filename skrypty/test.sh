if [ $1 == 1 ]; then
	mkdir -p carbon
	cd carbon
	mkdir -p data-{1,2,3}	
	cd ../mongo	
	mongodb-linux-x86_64-3.6.3/bin/mongod --replSet rs0 --port 27017 --bind_ip localhost --dbpath /home/jedrzej/Desktop/carbon/data-1 --smallfiles --oplogSize 128
elif [ $1 == 2 ]; then
	cd mongo
	mongodb-linux-x86_64-3.6.3/bin/mongod --replSet rs0 --port 27018 --bind_ip localhost --dbpath /home/jedrzej/Desktop/carbon/data-2 --smallfiles --oplogSize 128
elif [ $1 == 3 ]; then
	cd mongo
	mongodb-linux-x86_64-3.6.3/bin/mongod --replSet rs0 --port 27019 --bind_ip localhost --dbpath /home/jedrzej/Desktop/carbon/data-3 --smallfiles --oplogSize 128
elif [ $1 == 4 ]; then
	cd mongo
	mongodb-linux-x86_64-3.6.3/bin/mongo --host localhost:27017 --shell /home/jedrzej/Desktop/repl_set_init.js
	#rs.initiate(rsconf)
	#cfg = rs.conf()
	#cfg.settings.getLastErrorDefaults = { w: 1, j: false }
	#rs.reconfig(cfg)
elif [ $1 == 5 ]; then
	cd mongo
	#/usr/bin/time gunzip -c pktadr/pomorskie.json.gz |  mongodb-linux-x86_64-3.6.3/bin/mongoimport --drop \
	#--host rs0/localhost:27017,localhost:27018,localhost:27019 --db test \
	#--collection pomorskie
	#--file /home/jedrzej/Desktop/pktadr/pomorskie.json
	start_time=`date +%s`
	
	#/usr/bin/time gunzip -c /home/jedrzej/Desktop/pktadr/pomorskie5.json.gz | mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --collection pomorskie --drop 
	#/usr/bin/time mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --collection pomorskie --drop --file /home/jedrzej/Desktop/pktadr/pomorskie.json 
	#/usr/bin/time mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection londoncrimes1 --drop --file /home/jedrzej/Desktop/london_crime_m.csv --headerline 
	#/usr/bin/time mongodb-linux-x86_64-3.6.3/bin/mongodump --host rs0/localhost:27017,localhost:27018,localhost:27019 --db mojtest --gzip --archive=/home/jedrzej/Desktop/pktadr/pomorskie.json.gz 

	/usr/bin/time gunzip -c /home/jedrzej/Desktop/json/2018_03_26_08_17_34__22_pomorskie.json.gz | \
	jq --compact-output '{
		place: .properties.miejscowosc,
		street: .properties.ulica,
		zipcode: .properties.kodPocztowy,
		nr: .properties.numerPorzadkowy,
		status: .properties.status,
		geometry,
		admunit: .properties.jednostkaAdmnistracyjna
	}' | \
	mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --drop -d test -c pomorskie

	end_time=`date +%s`
	echo execution time was `expr $end_time - $start_time` s.
fi


