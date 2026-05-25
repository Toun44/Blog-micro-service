package com.blog.comment.service;

import com.blog.comment.dto.*;
import com.blog.comment.entity.Comment;
import com.blog.comment.feign.*;
import com.blog.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleClient articleClient;

    public CommentDTO create(CommentRequestDTO req) {
        ArticleDTO article = articleClient.getArticleById(req.getArticleId());
        Comment c = Comment.builder()
                .author(req.getAuthor())
                .content(req.getContent())
                .articleId(req.getArticleId())
                .build();
        return toDTO(commentRepository.save(c), article);
    }

    public List<CommentDTO> getByArticle(Long articleId) {
        ArticleDTO article = articleClient.getArticleById(articleId);
        return commentRepository.findByArticleId(articleId).stream()
                .map(c -> toDTO(c, article))
                .toList();
    }

    public Page<CommentDTO> getByArticlePaged(Long articleId, Pageable pageable) {
        ArticleDTO article = articleClient.getArticleById(articleId);
        return commentRepository.findByArticleId(articleId, pageable)
                .map(c -> toDTO(c, article));
    }

    public void delete(Long id) {
        commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commentaire introuvable : " + id));
        commentRepository.deleteById(id);
    }

    private CommentDTO toDTO(Comment c, ArticleDTO a) {
        return CommentDTO.builder()
                .id(c.getId())
                .author(c.getAuthor())
                .content(c.getContent())
                .articleId(c.getArticleId())
                .articleTitle(a.getTitle())
                .createdAt(c.getCreatedAt())
                .build();
    }
}
