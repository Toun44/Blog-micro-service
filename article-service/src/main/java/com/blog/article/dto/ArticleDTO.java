package com.blog.article.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDTO {

    private Long id;
    private String title;
    private String content;
    private String author;
    private String status;
    private Set<String> categories;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
