#!/bin/sh

npm run build && npm run build:web && heroku container:push web -a joke-scheduler && heroku container:release web -a joke-scheduler