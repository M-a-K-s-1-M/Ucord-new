Обращение к портам http://localhost:port, типа http://localhost:8080 по названию сервиса:
:8080 - /auth-service

Документация на auth-service: http://localhost:8080/swagger-ui/index.html

Команды на docker:

docker compose up - поднять все контейнеры с настройками из docker-compose.yml

docker compose down - очистить контейнеры с композа

docker image ls - лист образов

docker container ls - лист контенеров 

docker container ls -a - лист остоновленных контенеров

docker rmi $imagename/$imageid - удалить образ по имени/id
