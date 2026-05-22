package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

public class HomePage {
  private final WebDriver driver;
  private final By productItems = By.cssSelector(".product");
  private final By addToCartButton = By.cssSelector(".add-to-cart");
  private final By cartCount = By.cssSelector(".cart-count");
  private final By cartIcon = By.id("cart");

  public HomePage(WebDriver driver) {
    this.driver = driver;
  }

  public void addFirstProductToCart() {
    List<WebElement> products = driver.findElements(productItems);
    if (!products.isEmpty()) {
      WebElement first = products.get(0);
      WebElement addBtn = first.findElement(addToCartButton);
      addBtn.click();
    }
  }

  public void goToCart() {
    driver.findElement(cartIcon).click();
  }

  public int getCartCount() {
    try {
      String text = driver.findElement(cartCount).getText();
      return Integer.parseInt(text.replaceAll("\\D+", "").trim());
    } catch (Exception e) {
      return 0;
    }
  }
}
