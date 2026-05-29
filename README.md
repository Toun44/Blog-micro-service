Simple Blog, Spring boot microservices.

# Blog Microservices — Spring Cloud + MySQL

## Projets

| Service          | Port | Rôle                      |
|------------------|------|---------------------------|
| eureka-server    | 8761 | Découverte de services    |
| api-gateway      | 8080 | Point d'entrée unique     |
| article-service  | 8081 | CRUD articles + recherche |
| comment-service  | 8083 | CRUD commentaires + Feign |
| category-service | 8082 | CRUD catégories           |

## Base de données

Un seul serveur MySQL avec 3 bases distinctes :
- `article_db`
- `comment_db`
- `category_db`

Credentials par défaut : `root / root`

## Démarrage local

1. Démarrer MySQL sur le port 3306
2. Lancer dans l'ordre :
```
1. eureka-server    → mvn spring-boot:run
2. article-service  → mvn spring-boot:run
3. category-service → mvn spring-boot:run
4. comment-service  → mvn spring-boot:run
5. api-gateway      → mvn spring-boot:run
```

## Démarrage avec Docker

```bash
docker-compose up --build
```

## Endpoints Postman (tout via :8080)

```
# Articles
GET    /articles?search=spring&page=0&size=10
GET    /articles/{id}
POST   /articles
PUT    /articles/{id}
DELETE /articles/{id}

# Commentaires
GET    /comments/article/{articleId}
GET    /comments/article/{articleId}/paged?page=0&size=5
POST   /comments
DELETE /comments/{id}

# Catégories
GET    /categories
GET    /categories/{id}
POST   /categories
PUT    /categories/{id}
DELETE /categories/{id}
```

## URLs de debug

```
http://localhost:8761                          → UI Eureka
http://localhost:8080/actuator/gateway/routes → Routes Gateway
```
