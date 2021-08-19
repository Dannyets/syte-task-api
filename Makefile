build_docker_image:
	docker build . -f ./Dockerfile -t syte/tasks-api:latest