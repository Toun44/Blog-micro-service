package com.blog.category.service;

import com.blog.category.dto.*;
import com.blog.category.entity.Category;
import com.blog.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public CategoryDTO getById(Long id) {
        return toDTO(findOrThrow(id));
    }

    public CategoryDTO create(CategoryRequestDTO req) {
        if (categoryRepository.existsByName(req.getName())) {
            throw new RuntimeException("Catégorie déjà existante : " + req.getName());
        }
        Category c = Category.builder()
                .name(req.getName())
                .description(req.getDescription())
                .build();
        return toDTO(categoryRepository.save(c));
    }

    public CategoryDTO update(Long id, CategoryRequestDTO req) {
        Category c = findOrThrow(id);
        c.setName(req.getName());
        c.setDescription(req.getDescription());
        return toDTO(categoryRepository.save(c));
    }

    public void delete(Long id) {
        findOrThrow(id);
        categoryRepository.deleteById(id);
    }

    private Category findOrThrow(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable : " + id));
    }

    private CategoryDTO toDTO(Category c) {
        return CategoryDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .build();
    }
}
