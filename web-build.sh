#!/bin/sh

if [ -d src/web ]
then
    cd src/web && git checkout . && git pull --rebase
else
	cd src && git clone git@github.com:TisnKu/joke-scheduler-web.git web && cd web
fi

npm install
