package com.blog.article.service;

import com.blog.article.dto.*;
import com.blog.article.entity.*;
import com.blog.article.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    public Page<ArticleDTO> getAll(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (search != null && !search.isBlank()) {
            return articleRepository.search(search, pageable).map(this::toDTO);
        }
        return articleRepository.findAll(pageable).map(this::toDTO);
    }

    public ArticleDTO getById(Long id) {
        return toDTO(findOrThrow(id));
    }

    public ArticleDTO create(ArticleRequestDTO req) {
        Article a = Article.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .author(req.getAuthor())
                .status(req.getStatus())
                .categories(resolveCategories(req.getCategoryIds()))
                .build();
        return toDTO(articleRepository.save(a));
    }

    public ArticleDTO update(Long id, ArticleRequestDTO req) {
        Article a = findOrThrow(id);
        a.setTitle(req.getTitle());
        a.setContent(req.getContent());
        a.setAuthor(req.getAuthor());
        a.setStatus(req.getStatus());
        a.setCategories(resolveCategories(req.getCategoryIds()));
        return toDTO(articleRepository.save(a));
    }

    public void delete(Long id) {
        findOrThrow(id);
        articleRepository.deleteById(id);
    }

    private Article findOrThrow(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article introuvable : " + id));
    }

    private Set<Category> resolveCategories(Set<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return new HashSet<>();
        }
        return new HashSet<>(categoryRepository.findAllById(ids));
    }

    private ArticleDTO toDTO(Article a) {
        return ArticleDTO.builder()
                .id(a.getId())
                .title(a.getTitle())
                .content(a.getContent())
                .author(a.getAuthor())
                .status(a.getStatus().name())
                .categories(a.getCategories().stream()
                        .map(Category::getName)
                        .collect(Collectors.toSet()))
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .build();
    }
}
