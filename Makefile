up:
	docker-compose up -d --build

stop:
	docker-compose down

clean: stop

re: clear up
