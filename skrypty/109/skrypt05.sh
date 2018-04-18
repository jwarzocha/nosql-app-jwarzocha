#lokalnie mozliwa zmiana dwoch localhostow
cd /home/jwarzocha/magsem4/

start_time=`date +%s`

#mongodb-linux-x86_64-3.6.2/bin/mongoimport --host rs0/localhost:27017,localhost:27018,localhost:27019 --db test --type csv  --collection testlondoncrimes --drop --file /home/jwarzocha/magsem4/london_crime_test.csv --headerline 
#mongodb-linux-x86_64-3.6.2/bin/mongoimport --host rs0/localhost:27017,10.10.5.114:27018,10.10.5.112:27019 --db test --type csv  --collection testlondoncrimes --drop --file /home/jwarzocha/magsem4/london_crime_test.csv --headerline 
#mongodb-linux-x86_64-3.6.2/bin/mongoimport --host rs0/10.10.5.113:27017,10.10.5.113:27018,10.10.5.113:27019 --db test --type csv  --collection testlondoncrimes --drop --file /home/jwarzocha/magsem4/london_crime_test.csv --headerline 
mongodb-linux-x86_64-3.6.3/bin/mongoimport --host carbon/10.10.5.113:27017,10.10.5.114:27018,10.10.5.112:27019 --db test --type csv --collection milionlondoncrimes --drop --file /home/jwarzocha/magsem4/london_crimes_milion.csv --headerline 



end_time=`date +%s`
echo execution time was `expr $end_time - $start_time` s.
