package loops;

import java.util.Scanner;

public class PrimeCheck {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int num = sc.nextInt();
    boolean isPrime = true;

    if (num <= 1) {
      isPrime = false;
    } else {
      for (int i = 2; i <= num / 2; i++) {
        if (num % i == 0) {
          isPrime = false;
          break;
        }
      }
    }

    if (isPrime)
      System.out.println(num + " is a Prime Number");
    else
      System.out.println(num + " is Not a Prime Number");
  }

  // explanation: This program checks if a number is prime.
  // A prime number is a natural number greater than 1 that cannot be formed by
  // multiplying two smaller natural numbers.
  // The program prompts the user to enter a number, checks if it is less than or
  // equal to 1 (in which case it is not prime), and then checks for factors from
  // 2 up to half of the number.
  // If any factor divides the number evenly, it is not prime; otherwise, it is
  // prime.
  // The result is printed to the console, indicating whether the input number is
  // prime or not.
  // For example, if the input is 7, the output will be "7 is a Prime Number".
  // This code can be used to check the primality of any integer input by the user
  // and can be easily modified to handle larger numbers or different input types.
  // It is a good exercise for beginners to understand how to implement basic
  // algorithms and use loops in Java.
  // The output will be printed to the console, indicating whether the input
  // number is prime or not.
  // This code can be used in educational contexts to teach basic programming
  // concepts such as loops, conditionals, and input handling.
  // It can also be adapted for more complex scenarios where prime numbers need to
  // be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable for
  // beginners learning Java programming.
  // The output will be printed to the console, showing whether the input number
  // is prime or not.
  // This code can be used in educational contexts to teach basic programming
  // concepts such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where prime numbers
  // need to be processed or stored in a data structure for further use.

  // The program is straightforward and easy to understand, making it suitable for
  // beginners learning Java programming.
  // The output will be printed to the console, showing whether the input number
  // is prime or not.
  // This code can be used in educational contexts to teach basic programming
  // concepts such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where prime numbers
  // need to be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable for
  // beginners learning Java programming.
  // The output will be printed to the console, showing whether the input number
}
