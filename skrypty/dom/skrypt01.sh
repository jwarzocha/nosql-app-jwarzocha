mkdir -p carbon
cd carbon
mkdir -p data-{1,2,3}

cd ../mongo

mongodb-linux-x86_64-3.6.3/bin/mongod --replSet rs0 --port 27017 --bind_ip localhost --dbpath /home/jedrzej/Desktop/carbon/data-1 --smallfiles --oplogSize 128