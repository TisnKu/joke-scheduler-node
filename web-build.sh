#!/bin/sh

if [ -d src/web ]
then
    cd src/web && git checkout . && git pull --rebase
else
	cd src && git clone https://github.com/TisnKu/joke-scheduler-web.git web && cd web
fi

npm install && ([ ! -d ../../dist/web ] || rm -rf ../../dist/web) && mkdir ../../dist/web && cp -r ./dist ../../dist/web/dist
