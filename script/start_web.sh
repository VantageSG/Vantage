#!/bin/bash -e

if [[ -a /tmp/puma.pid ]]; then
  rm /tmp/puma.pid
fi

if [[ $RAILS_ENV == "production" ]]; then
  echo "in prod"
  EDITOR="mate --wait" bundle exec rails credentials:edit
  bundle exec rake assets:precompile
  mkdir -p /usr/share/nginx/html
  cp -R public/* /usr/share/nginx/html/
  mkdir -p /etc/nginx/conf.d/
  cp site.conf /etc/nginx/conf.d/default.conf
fi

bundle exec rails server -b 0.0.0.0 -P /tmp/puma.pid