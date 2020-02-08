FROM ruby:2.6.4

WORKDIR /myapp

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash \
 && apt-get update && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/* \
 && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update && apt-get install -y yarn && rm -rf /var/lib/apt/lists/*
 RUN apt-get -y update && \
      apt-get install --fix-missing --no-install-recommends -qq -y \
        build-essential \
        vim \
        wget gnupg \
        git-all \
        curl \
        ssh \
      wget -qO- https://deb.nodesource.com/setup_9.x  | bash - && \
      apt-get install -y nodejs && \
      wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
      echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
      apt-get update && \
      apt-get install yarn && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy the Gemfile and install the the RubyGems.
# This is a separate step so that bundle install wont run again unless Gemfile has changed
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

# Cache yarn install as much as possible unless any of them changes
COPY yarn.lock package.json ./
RUN yarn install





# FROM ruby:2.6.4
# ARG precompileassets

# RUN apt-get update && apt-get install -y curl gnupg
# RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" > /etc/apt/sources.list.d/pgdg.list
# RUN curl -q https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# RUN apt-get -y update && \
#       apt-get install --fix-missing --no-install-recommends -qq -y \
#         build-essential \
#         vim \
#         wget gnupg \
#         git-all \
#         curl \
#         ssh \
#         mysql-client \
#         postgresql-client-10 libpq5 libpq-dev -y && \
#       wget -qO- https://deb.nodesource.com/setup_9.x  | bash - && \
#       apt-get install -y nodejs && \
#       wget -qO- https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#       echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#       apt-get update && \
#       apt-get install yarn && \
#       apt-get clean && \
#       rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# RUN gem install bundler
# #Install gems
# RUN mkdir /gems
# WORKDIR /gems
# COPY Gemfile .
# COPY Gemfile.lock .
# RUN bundle install

# ARG INSTALL_PATH=/opt/vantage
# ENV INSTALL_PATH $INSTALL_PATH
# WORKDIR $INSTALL_PATH
# COPY . .

# RUN scripts/potential_asset_precompile.sh $precompileassets