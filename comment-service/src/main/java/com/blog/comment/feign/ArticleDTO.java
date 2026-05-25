package com.blog.comment.feign;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDTO {

    private Long id;
    private String title;
    private String status;
}
