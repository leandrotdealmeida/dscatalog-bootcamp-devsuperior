package com.devjapa.dscatalog.tests.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devjapa.dscatalog.entities.Product;
import com.devjapa.dscatalog.repositories.ProductRepository;
import com.devjapa.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPcGameProducts;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPcGameProducts = 21L;
	}
	
	@Test
	public void findShouldReturnProductsWhenNameExists() {
		String name = "PC Gamer";
		PageRequest pageRequest =  PageRequest.of(0, 10);
		
		Page<Product> result = repository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGameProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWithAutoincrementWhenIdIsNull() {
		
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
		
	}
	
	@Test
	public void deleteShouldObjectWhenIdExits() {
		
		repository.deleteById(existingId);
		
		Optional<Product> result = repository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
		
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
		
	}

}
