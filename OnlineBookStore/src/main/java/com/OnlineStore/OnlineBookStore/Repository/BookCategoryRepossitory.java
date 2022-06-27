package com.OnlineStore.OnlineBookStore.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.OnlineStore.OnlineBookStore.entity.BookCategory;

//@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(collectionResourceRel = "bookCategory", path="book-category")
public interface BookCategoryRepossitory extends JpaRepository<BookCategory, Long>{
	 
}
