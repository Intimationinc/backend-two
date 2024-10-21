#!/bin/sh

DEBUG=${DEBUG:-0}
WORKERS=${WORKERS:-5}

python3 manage.py migrate
python3 manage.py collectstatic --no-input

if [ "$DEBUG" -eq 1 ]
then
  python3 manage.py runserver 0.0.0.0:8000
else
  daphne -b 0.0.0.0 -p 8000 project.asgi:application
fi
