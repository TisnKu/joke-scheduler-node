#!/bin/sh

if [ -d web ]
then
    cd web && git checkout . && git pull --rebase
else
	git clone https://github.com/TisnKu/joke-scheduler-web.git web && cd web
fi

npm install && cd .. && ([ ! -d dist/web ] || rm -rf dist/web) && mv web/dist dist/web
