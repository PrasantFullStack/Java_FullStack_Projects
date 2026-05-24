package base;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.*;

import java.time.Duration;

public class BaseTest {

  protected WebDriver driver;

  @BeforeMethod
  public void setup() {

    System.out.println("Launching browser...");

    driver = new ChromeDriver();
    driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    driver.manage().window().maximize();

    driver.get("http://localhost:3000"); // update if needed
  }

  @AfterMethod
  public void tearDown() {
    System.out.println("Closing browser...");
    driver.quit();
  }
}