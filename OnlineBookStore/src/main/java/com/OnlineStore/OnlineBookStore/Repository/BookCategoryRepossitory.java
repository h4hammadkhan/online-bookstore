package com.OnlineStore.OnlineBookStore.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.OnlineStore.OnlineBookStore.entity.BookCategory;

@RepositoryRestResource(collectionResourceRel = "bookCategory", path="book-category")
public interface BookCategoryRepossitory extends JpaRepository<BookCategory, Long>{
	 
}
