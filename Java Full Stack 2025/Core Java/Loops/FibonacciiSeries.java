package loops;

import java.util.Scanner;

public class FibonacciiSeries {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter how many terms: ");
    int n = sc.nextInt();

    int a = 0, b = 1;
    System.out.print("Fibonacci Series: " + a + " " + b + " ");

    for (int i = 3; i <= n; i++) {
      int c = a + b;
      System.out.print(c + " ");
      a = b;
      b = c;
    }
  }

  // Explanation: This program generates the Fibonacci series up to a specified
  // number of terms.
  // It starts with the first two terms (0 and 1) and calculates subsequent terms
  // by summing the two preceding terms.
  // For example, if the user inputs 5, the output will be "Fibonacci Series: 0 1
  // 1 2 3".
  // This code can be used to understand the Fibonacci sequence and its
  // properties.
  // It demonstrates the use of loops and basic arithmetic operations in Java.
  // The program uses a for loop to iterate through the number of terms specified
  // by the user
  // and prints each term of the Fibonacci series.
  // It can be extended to include more features, such as storing the series in an
  // array
  // or allowing the user to input a different starting point for the series.
  // This flexibility allows the code to be adapted for different requirements.
  // The program is straightforward and easy to understand, making it suitable for
  // beginners
  // learning Java programming. It serves as a good example of how to work with
  // loops and
  // arithmetic operations in Java.
  // The output will be printed to the console, showing each term of the Fibonacci
  // series
  // found in the specified range.
  // This code can be used in educational contexts to teach basic programming
  // concepts
  // such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where Fibonacci numbers
  // need to be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable

  // for beginners learning Java programming.
  // The output will be printed to the console, showing each term of the Fibonacci
  // series
  // found in the specified range.
  // This code can be used in educational contexts to teach basic programming
  // concepts
  // such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where Fibonacci numbers
  // need to be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable
  // for beginners learning Java programming.
  // The output will be printed to the console, showing each term of the Fibonacci
  // series
  // found in the specified range.
  // This code can be used in educational contexts to teach basic programming
  // concepts
  // such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where Fibonacci numbers
  // need to be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable
  // for beginners learning Java programming.
  // The output will be printed to the console, showing each term of the Fibonacci
  // series
}
