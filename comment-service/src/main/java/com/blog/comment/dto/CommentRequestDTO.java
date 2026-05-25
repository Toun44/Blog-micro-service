package com.blog.comment.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestDTO {

    @NotBlank(message = "L'auteur est obligatoire")
    private String author;

    @NotBlank
    @Size(min = 3, max = 1000)
    private String content;

    @NotNull(message = "L'articleId est obligatoire")
    private Long articleId;
}
