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

  }
}
