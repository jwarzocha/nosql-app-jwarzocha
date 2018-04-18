#po ssh mozliwa zmiana localhost
#ssh jwarzocha@linux-p109-18
#10.10.5.112

#mkdir -p /tmp/jwarzocha/carbon 
#cd /tmp/jwarzocha/carbon 
#mkdir -p data-{1,2,3}

cd /home/jwarzocha/magsem4/
#mongodb-linux-x86_64-3.6.2/bin/mongod --replSet rs0 --port 27019 --bind_ip localhost --dbpath /tmp/jwarzocha/carbon/data-3 --smallfiles --oplogSize 128
#mongodb-linux-x86_64-3.6.2/bin/mongod --replSet rs0 --port 27019 --bind_ip 10.10.5.112 --dbpath /tmp/jwarzocha/carbon/data-3 --smallfiles --oplogSize 128
#mongodb-linux-x86_64-3.6.2/bin/mongod --replSet rs0 --port 27019 --bind_ip 10.10.5.113 --dbpath /tmp/jwarzocha/carbon/data-3 --smallfiles --oplogSize 128
mongodb-linux-x86_64-3.6.3/bin/mongod --replSet carbon --port 27019 --bind_ip 10.10.5.114,localhost --dbpath /tmp/jwarzocha/carbon/data-3 --smallfiles --oplogSize 128
#mongodb-linux-x86_64-3.6.3/bin/mongod --replSet carbon --port 27019 --bind_ip 10.10.5.112 --dbpath /tmp/jwarzocha/carbon/data-3 --smallfiles --oplogSize 128
