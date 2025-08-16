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

  // explanation: This program implements a simple menu-driven calculator.
  // It allows the user to perform addition, subtraction, multiplication, and
  // division
  // of two integers.
  // The user can choose an operation by entering a number from 1 to 4.
  // The program continues to prompt for operations until the user chooses to exit
  // by entering 5.
  // For example, if the user chooses 1 for addition and inputs 5 and 3,
  // the output will be "Sum = 8".
  // This code can be used as a basic calculator in console applications.

  // It demonstrates the use of methods for different operations and a loop for
  // menu navigation.
  // The program also handles division by zero by returning 0 in such cases.
  // This can be extended to include more operations or features as needed.
  // It is a good example of how to structure a simple console application in
  // Java.

  // The code can be used in educational contexts to teach basic programming
  // concepts
  // such as methods, loops, and user input handling.

  // It can also be adapted for more complex calculators or applications that
  // require
  // mathematical operations.
}
