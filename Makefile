start:
	docker-compose up -d
build:
	docker-compose build
node:
	docker-compose exec node bash
restart-api:
	docker-compose restart api