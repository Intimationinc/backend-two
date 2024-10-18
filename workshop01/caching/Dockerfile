FROM python:3.12-alpine AS requirement

WORKDIR /requirement

COPY ./pyproject.toml ./poetry.lock ./
RUN pip3 install -U pip
RUN pip3 install -U poetry
RUN poetry export --only main --format requirements.txt --output requirements.txt


FROM python:3.12-alpine

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

RUN pip3 install -U pip
COPY --from=requirement /requirement/requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY entrypoint.sh /app/entrypoint.sh
COPY . .

EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
