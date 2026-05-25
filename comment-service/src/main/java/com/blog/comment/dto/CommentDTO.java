package com.blog.comment.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;
    private String author;
    private String content;
    private Long articleId;
    private String articleTitle;
    private LocalDateTime createdAt;
}
