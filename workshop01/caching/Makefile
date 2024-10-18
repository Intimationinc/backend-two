format:
	poetry run ruff check . --fix

build:
	docker build --rm -t caching-experiment:local .

start:
	docker run -it --rm -v ./:/app --env-file .env --publish 8000:8000 --name caching-experiment-local caching-experiment:local

run: build start;
