FROM python:3.12-alpine AS requirements

WORKDIR /requirements

RUN pip3 install -U pip
RUN pip3 install -U poetry

COPY ./pyproject.toml ./poetry.lock ./
RUN poetry export --only main --format requirements.txt --output requirements.txt


FROM python:3.12-alpine

WORKDIR /app

RUN pip3 install -U pip
COPY --from=requirements /requirements/requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
