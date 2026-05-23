package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.LoginPage;

public class CartTest extends BaseTest {

  @Test
  public void testAddToCart() throws InterruptedException {
    LoginPage login = new LoginPage(driver);
    // adjust credentials as needed for your app
    login.login("testuser", "password");

    HomePage home = new HomePage(driver);
    home.addFirstProductToCart();
    // brief pause to allow UI to update
    Thread.sleep(1000);

    int count = home.getCartCount();
    Assert.assertTrue(count > 0, "Expected cart count to be > 0 after adding a product");
  }
}
