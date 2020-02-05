start:
	docker-compose up -d
build:
	docker-compose build
node:
	docker-compose exec node bash
geth:
	docker-compose exec node bash -c "./go-ethereum/build/bin/geth attach http://localhost:7545"
restart-api:
	docker-compose restart api