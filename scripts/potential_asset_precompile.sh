#!/bin/bash

echo 'Running potential asset precompile'

if [ $# -eq 0 ] ; then
  echo 'no argument supplied, precompiling'
  bundle exec rake assets:precompile RAILS_ENV=production
else
  if [ $1 == "not" ] ; then
    echo "argument == not, so not running precompile"
  else
    echo 'argument supplied but different from not, precompiling'
    bundle exec rake assets:precompile RAILS_ENV=production
  fi
fi
