package arrays;

import java.util.Scanner;

public class MenuCalculator {
  public static int add(int a, int b) {
    return a + b;
  }

  public static int sub(int a, int b) {
    return a - b;
  }

  public static int mul(int a, int b) {
    return a * b;
  }

  public static double div(int a, int b) {
    if (b == 0)
      return 0;
    return (double) a / b;
  }

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int choice;
    do {
      System.out.println("\n1. Add\n2. Sub\n3. Mul\n4. Div\n5. Exit");
      System.out.print("Enter choice: ");
      choice = sc.nextInt();
      if (choice >= 1 && choice <= 4) {
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();
        switch (choice) {
          case 1 -> System.out.println("Sum = " + add(a, b));
          case 2 -> System.out.println("Diff = " + sub(a, b));
          case 3 -> System.out.println("Product = " + mul(a, b));
          case 4 -> System.out.println("Quotient = " + div(a, b));
        }
      }
    } while (choice != 5);
  }
}
