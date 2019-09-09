#!/usr/bin/env bash

python src/main.py

if [ -z "${API_KEY}" ]; then
  echo "API_KEY is not set"
fi

if [ -z "${CITY_CODE}" ]; then
    echo "CITY_CODE is not set"
fi

if [ -z "${FREQ}" ]; then
    echo "FREQ is not set"
fi

while : ; do
echo "Idling..."
sleep 600
done
