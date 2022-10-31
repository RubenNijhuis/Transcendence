up:
	docker-compose up -d --build

stop:
	docker-compose down -v

clean: stop
	# docker system prune

re: clean up
