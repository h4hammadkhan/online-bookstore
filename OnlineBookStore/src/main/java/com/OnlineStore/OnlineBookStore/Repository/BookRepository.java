package com.OnlineStore.OnlineBookStore.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.OnlineStore.OnlineBookStore.entity.Book;

//@CrossOrigin("*") * indicate allow all request from all host
@CrossOrigin("http://localhost:4200/") // in our case we know the host that's why we tell the hostname to the spring boot
public interface BookRepository extends JpaRepository<Book, Long>{

	
}
