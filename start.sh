#!/usr/bin/bash
cd /root/medicine-delivery-app/
git pull
chmod a+x start.sh
#
cd /root/medicine-delivery-app/server
ls -l
npm install
#npm run build
pm2 start /root/medicine-delivery-app/server/index.js --name=medicine-delivery-app-server
pm2 reload medicine-delivery-app-server
#
cd /root/medicine-delivery-app/client
ls -l
npm install
npm run build
rm -r /var/www/e699500.online-server.cloud/*
cp -r /root/medicine-delivery-app/client/build/* /var/www/e699500.online-server.cloud/