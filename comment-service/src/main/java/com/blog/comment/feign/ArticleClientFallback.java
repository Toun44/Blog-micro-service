package com.blog.comment.feign;

import org.springframework.stereotype.Component;

@Component
public class ArticleClientFallback implements ArticleClient {

    @Override
    public ArticleDTO getArticleById(Long id) {
        return new ArticleDTO(id, "Article indisponible", "UNKNOWN");
    }
}
