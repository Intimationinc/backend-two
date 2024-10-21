format:
	poetry run ruff check --select I --fix
	poetry run ruff format

build:
	docker build --rm -t public-private-channels:local .

start:
	docker run --rm -it --env-file .env -v ./:/app --publish 8000:8000 --name public-private-channels-local public-private-channels:local

run: build start;
