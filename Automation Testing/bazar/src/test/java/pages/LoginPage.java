package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage {

  private final WebDriver driver;
  private final By usernameField = By.id("username");
  private final By passwordField = By.id("password");
  private final By loginButton = By.id("login");

  public LoginPage(WebDriver driver) {
    this.driver = driver;
  }

  public void login(String username, String password) {
    driver.findElement(usernameField).clear();
    driver.findElement(usernameField).sendKeys(username);
    driver.findElement(passwordField).clear();
    driver.findElement(passwordField).sendKeys(password);
    driver.findElement(loginButton).click();
  }
}
