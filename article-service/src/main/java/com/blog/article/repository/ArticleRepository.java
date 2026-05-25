package com.blog.article.repository;

import com.blog.article.entity.Article;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findByStatus(Article.ArticleStatus status, Pageable pageable);

    @Query("SELECT a FROM Article a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%',:search,'%')) OR LOWER(a.content) LIKE LOWER(CONCAT('%',:search,'%'))")
    Page<Article> search(@Param("search") String search, Pageable pageable);
}
