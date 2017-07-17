echo "Docker-compose up"
docker-compose run backend SET NODE_ENV=test & mocha backend/test --recursive --compilers js:babel-core/register --require babel-polyfill --reporter spec
