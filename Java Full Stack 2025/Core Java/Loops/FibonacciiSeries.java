package Loops;

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
}
