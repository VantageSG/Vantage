FROM timbru31/ruby-node:2.6

WORKDIR /myapp


# Copy the Gemfile and install the the RubyGems.
# This is a separate step so that bundle install wont run again unless Gemfile has changed
COPY Gemfile Gemfile.lock ./

RUN gem install bundler

# Cache yarn install as much as possible unless any of them changes
COPY yarn.lock package.json ./
RUN yarn install
