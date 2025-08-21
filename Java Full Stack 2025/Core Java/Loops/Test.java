package loops;

public class Test {
  public static void main(String[] args) {
    int num = 15;
    int a = 0, b = 1;

    for (int i = 2; i <= num; i++) {
      int c = a + b;
      System.out.println(c + " ");
      a = b;
      b = c;

    }
    // explanation: This program prints the Fibonacci series up to a given number
    // using a for loop.
    // It initializes the first two numbers of the series and then uses a loop to
    // calculate the next numbers by summing the last two numbers.

  }
}
