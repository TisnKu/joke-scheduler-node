#!/bin/sh

if [ -d web ]
then
    echo web exists, git updating
    cd web && git checkout . && git pull --rebase
else
    echo web not exists, git cloning
	git clone https://github.com/TisnKu/joke-scheduler-web.git web && cd web
fi

npm install && npm run build && cd .. && ([ ! -d dist/web ] || rm -rf dist/web) && mv web/dist dist/web
