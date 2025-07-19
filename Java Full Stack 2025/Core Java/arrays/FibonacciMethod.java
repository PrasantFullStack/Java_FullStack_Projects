package arrays;

public class FibonacciMethod {
  public static void fibonacci(int n) {
    int a = 0, b = 1;
    System.out.print(a + " " + b + " ");
    for (int i = 3; i <= n; i++) {
      int c = a + b;
      System.out.print(c + " ");
      a = b;
      b = c;
    }
  }

  public static void main(String[] args) {
    fibonacci(10);
  }

}
