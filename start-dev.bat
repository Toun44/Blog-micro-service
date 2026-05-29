@echo off

echo Chargement des variables d'environnement...
for /f "tokens=1,2 delims==" %%a in (.env) do (
    set %%a=%%b
)

echo Demarrage de MySQL...
start "MySQL" cmd /k "docker-compose up mysql"

timeout /t 15 /nobreak

echo Demarrage de eureka-server...
start "eureka-server" cmd /k "cd eureka-server && mvn spring-boot:run"

timeout /t 20 /nobreak

echo Demarrage de article-service...
start "article-service" cmd /k "set SPRING_DATASOURCE_USERNAME=%DB_USERNAME%&& set SPRING_DATASOURCE_PASSWORD=%DB_PASSWORD%&& cd article-service && mvn spring-boot:run"

echo Demarrage de category-service...
start "category-service" cmd /k "set SPRING_DATASOURCE_USERNAME=%DB_USERNAME%&& set SPRING_DATASOURCE_PASSWORD=%DB_PASSWORD%&& cd category-service && mvn spring-boot:run"

echo Demarrage de comment-service...
start "comment-service" cmd /k "set SPRING_DATASOURCE_USERNAME=%DB_USERNAME%&& set SPRING_DATASOURCE_PASSWORD=%DB_PASSWORD%&& cd comment-service && mvn spring-boot:run"

timeout /t 20 /nobreak

echo Demarrage de api-gateway...
start "api-gateway" cmd /k "cd api-gateway && mvn spring-boot:run"

echo.
echo Tous les services sont en cours de demarrage.
echo Verifiez Eureka sur http://localhost:8761