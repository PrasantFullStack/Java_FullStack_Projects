package loops;

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
  // explanation: This program checks if a given number is prime.
  // A prime number is a natural number greater than 1 that cannot be formed by
  // multiplying two smaller natural numbers.
  // The program initializes a number and checks for factors from 2 up to half of
  // the
  // number. If any factor divides the number evenly, it is not prime; otherwise,
  // it is prime.
  // The result is printed to the console, indicating whether the input number is
  // prime or not

  // For example, if the input is 23, the output will be "This number is Prime".
  // This code can be used to check the primality of any integer and can be easily
  // modified
  // to handle larger numbers or different input types.
}
