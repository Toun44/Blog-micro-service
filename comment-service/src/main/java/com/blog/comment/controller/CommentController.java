package com.blog.comment.controller;

import com.blog.comment.dto.*;
import com.blog.comment.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CommentDTO create(@RequestBody @Valid CommentRequestDTO req) {
        return commentService.create(req);
    }

    @GetMapping("/article/{articleId}")
    public List<CommentDTO> getByArticle(@PathVariable Long articleId) {
        return commentService.getByArticle(articleId);
    }

    @GetMapping("/article/{articleId}/paged")
    public Page<CommentDTO> getByArticlePaged(
            @PathVariable Long articleId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return commentService.getByArticlePaged(articleId, PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        commentService.delete(id);
    }
}
