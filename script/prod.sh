#!/bin/bash -e

docker-compose -f docker-compose.prod.yml "$@"