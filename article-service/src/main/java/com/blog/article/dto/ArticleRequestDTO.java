package com.blog.article.dto;

import com.blog.article.entity.Article;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleRequestDTO {

    @NotBlank(message = "Le titre est obligatoire")
    private String title;

    @NotBlank(message = "Le contenu est obligatoire")
    private String content;

    private String author;
    private Article.ArticleStatus status = Article.ArticleStatus.DRAFT;
    private Set<Long> categoryIds = new HashSet<>();
}
