package loops;

public class FibonacciSeries {
  // write a program print Fibonacci series up to N terms
  // Example: 0 1 1 2 3 5 8 13 21....
  public static void main(String[] args) {
    int n = 10;
    int a = 0, b = 1;
    System.out.println(a + " " + b + " ");

    for (int i = 2; i < n; i++) {
      int c = a + b;
      System.out.println(c + " ");
      a = b;
      b = c;

    }

    // Explanation: This program prints the Fibonacci series up to N terms.
    // It starts with the first two terms (0 and 1) and then calculates each
    // subsequent term by summing the two preceding terms.
    // For example, if N is 10, the output will be "0 1 1 2 3 5 8 13 21 34".
    // This code can be used to understand the Fibonacci sequence and its
    // properties.
    // It demonstrates the use of loops and basic arithmetic operations in Java.
    // The program uses a for loop to iterate through the number of terms specified
    // and prints each term of the Fibonacci series.
    // It can be extended to include more features, such as storing the series in an
    // array or allowing the user to input a different starting point for the
    // series.
    // This flexibility allows the code to be adapted for different requirements.
    // The program is straightforward and easy to understand, making it suitable for
    // beginners learning Java programming. It serves as a good example of how to
    // work with
    // loops and arithmetic operations in Java.
    // The output will be printed to the console, showing each term of the Fibonacci
    // series found in the specified range.
    // This code can be used in educational contexts to teach basic programming
    // concepts such as loops, conditions, and arithmetic operations.
    // It can also be adapted for more complex scenarios where Fibonacci numbers
    // need to be processed or stored in a data structure for further use.

  }
}
