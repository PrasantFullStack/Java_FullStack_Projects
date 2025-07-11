package Loops;

public class PrimeNumberCheck {
  public static void main(String[] args) {

    // this check prime number
    int num = 23;
    boolean isPrime = true;
    for (int i = 2; i <= num / 2; i++) {
      if (num % i == 0) {
        isPrime = false;
        break;
      }

    }
    if (isPrime) {
      System.out.println("This number is Prime");

    } else {
      System.out.println("This number is not prime");

    }
  }
}
