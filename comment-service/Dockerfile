FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY eureka-server/pom.xml eureka-server/
COPY api-gateway/pom.xml api-gateway/
COPY article-service/pom.xml article-service/
COPY comment-service/pom.xml comment-service/
COPY category-service/pom.xml category-service/
COPY comment-service/src comment-service/src
RUN mvn -pl comment-service -am package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/comment-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
