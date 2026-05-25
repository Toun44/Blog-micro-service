package com.blog.comment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "article-service", fallback = ArticleClientFallback.class)
public interface ArticleClient {

    @GetMapping("/articles/{id}")
    ArticleDTO getArticleById(@PathVariable("id") Long id);
}
