package com.blog.comment.repository;

import com.blog.comment.entity.Comment;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByArticleId(Long articleId);

    Page<Comment> findByArticleId(Long articleId, Pageable pageable);
}
