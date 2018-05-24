#!/bin/bash

while ! exec 6<>/dev/tcp/${DB_HOST}/${DB_PORT}; do
  echo "Trying to connect to DB ${DB_HOST}/${DB_PORT}"
  sleep 10
  echo "Retrying..."
done

echo "Database connected! Starting the app..."

if [ "$NODE_ENV" = "development" ]; then
  npm run start:watch
elif [ "$NODE_ENV" = "production" ]; then
  npm run prestart:prod
  npm run start:prod
fi
