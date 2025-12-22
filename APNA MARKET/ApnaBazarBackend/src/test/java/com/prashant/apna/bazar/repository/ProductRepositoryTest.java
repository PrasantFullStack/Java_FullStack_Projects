package com.prashant.apna.bazar.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.prashant.apna.bazar.entities.Product;
import com.prashant.apna.bazar.repositories.ProductRepo;

@DataJpaTest
public class ProductRepositoryTest {

  // Inject the ProductRepo to test its methods
  // Use @DataJpaTest for JPA repository testing
  // This annotation configures an in-memory database, scans for @Entity classes
  // and configures Spring Data JPA repositories
  // It also disables full auto-configuration and instead applies only
  // configuration relevant to JPA tests
  //

  @Autowired
  private ProductRepo productRepository;

  @Test
  void testSaveProduct() {
    Product product = new Product();
    product.setName("Laptop");
    product.setBasePrice(50000.0);
    product.setMaincategory("Electronics");

    Product savedProduct = productRepository.save(product);

    assertThat(savedProduct.getId()).isNotNull();
    assertThat(savedProduct.getName()).isEqualTo("Laptop");
  }

  @Test
  void testFindByCategory() {
    Product p1 = new Product();
    p1.setName("Phone");
    p1.setBasePrice(30000.0);
    p1.setMaincategory("Mobiles");

    Product p2 = new Product();
    p2.setName("Laptop");
    p2.setBasePrice(50000.0);
    p2.setMaincategory("Mobiles");

    productRepository.save(p1);
    productRepository.save(p2);

    List<Product> mobiles = productRepository.findByMaincategory("Mobiles");

    assertThat(mobiles).hasSize(2);
  }

  @Test
  void testDeleteProduct() {
    Product product = new Product();
    product.setName("TV");
    product.setBasePrice(40000.0);
    product.setMaincategory("Electronics");

    Product saved = productRepository.save(product);

    productRepository.deleteById(saved.getId());

    boolean exists = productRepository.existsById(saved.getId());
    assertThat(exists).isFalse();
  }
  // Additional tests can be added here for more coverage
  // like update, findAll, etc
}
