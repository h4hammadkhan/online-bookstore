package com.OnlineStore.OnlineBookStore.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OnlineStore.OnlineBookStore.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

	
}
