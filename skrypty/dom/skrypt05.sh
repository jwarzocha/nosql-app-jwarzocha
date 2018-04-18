cd mongo
#mongodb-linux-x86_64-3.6.3/bin/mongoimport --host carbon/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection londoncrimes --drop --file /home/jedrzej/Desktop/london_crime_test.csv --headerline 
#mongodb-linux-x86_64-3.6.3/bin/mongoimport --db test --type csv  --collection londoncrimes --drop --file /home/jedrzej/Desktop/london_crime_test.csv --headerline

start_time=`date +%s`

mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection londoncrimes1 --drop --file /home/jedrzej/Desktop/london_crime_4m.csv --headerline 
#mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection londoncrimes2 --drop --file /home/jedrzej/Desktop/london_crime_test.csv --headerline 
#mongodb-linux-x86_64-3.6.3/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection londoncrimes3 --drop --file /home/jedrzej/Desktop/london_crime_by_lsoa.csv --headerline 


end_time=`date +%s`
echo execution time was `expr $end_time - $start_time` s.
