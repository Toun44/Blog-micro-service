FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY eureka-server/pom.xml eureka-server/
COPY api-gateway/pom.xml api-gateway/
COPY article-service/pom.xml article-service/
COPY comment-service/pom.xml comment-service/
COPY category-service/pom.xml category-service/
COPY category-service/src category-service/src
RUN mvn -pl category-service -am package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/category-service/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
