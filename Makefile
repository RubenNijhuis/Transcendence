up:
	docker-compose up -d --build

stop:
	docker-compose down

clear: stop
	docker rm $(docker ps -qa)

re: clear up
