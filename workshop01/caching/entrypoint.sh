#!/bin/sh

DEBUG="${DEBUG:-0}"
N_WORKER="${N_WORKER:-5}"

python3 manage.py migrate
if [ "$DEBUG" -eq 1 ];
then
  python3 manage.py runserver 0.0.0.0:8000
else
  gunicorn --workers="$N_WORKER" --bind=0.0.0.0:8000 project.wsgi:application
fi
