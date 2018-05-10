#!/bin/sh

npm install && npm run build && docker image build -t joke-scheduler-node:$1 .
