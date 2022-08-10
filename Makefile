up:
	docker-compose up -d --build

stop:
	docker-compose down -v

clean: stop

re: clean up
