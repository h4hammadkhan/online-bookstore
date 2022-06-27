package com.OnlineStore.OnlineBookStore.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.OnlineStore.OnlineBookStore.entity.Book;

//@CrossOrigin("*") * indicate allow all request from all host
//@CrossOrigin("http://localhost:4200/") // in our case we know the host that's why we tell the hostname to the spring boot
public interface BookRepository extends JpaRepository<Book, Long>{
	
	@RestResource(path = "categoryid")
	Page<Book> findByCategoryId(@Param("id") Long id, Pageable pageable);
	
	@RestResource(path = "searchByKeyword")
	Page<Book> findByNameContaining(@Param("name") String keyword, Pageable pageable);
}
