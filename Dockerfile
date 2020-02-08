FROM ruby:2.6.4-slim 
LABEL maintainer="mingsheng@xfers.com"

WORKDIR /myapp

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install --quiet --yes \
    vim \
    git \
    libmysqlclient-dev \
    libmagickwand-dev \
    imagemagick \
    tzdata

# Copy the Gemfile and install the the RubyGems.
# This is a separate step so that bundle install wont run again unless Gemfile has changed
COPY Gemfile Gemfile.lock ./
COPY engines ./engines/
RUN gem install bundler && bundle install --jobs 20 --retry 5 --without development test --deployment

# Cache yarn install as much as possible unless any of them changes
COPY yarn.lock package.json ./
RUN yarn install

# Copying local always changes, therefore put it last
COPY . ./

RUN RAILS_ENV=production bundle exec rake assets:precompile
