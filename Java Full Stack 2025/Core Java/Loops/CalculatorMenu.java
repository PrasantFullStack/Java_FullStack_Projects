package Loops;

import java.util.Scanner;

public class CalculatorMenu {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int choice;
    do {
      System.out.println("1. Add\n2. Subtract\n3. Multiply\n4. Divide\n5. Exit");
      System.out.print("Enter your choice: ");
      choice = sc.nextInt();

      if (choice >= 1 && choice <= 4) {
        System.out.print("Enter two numbers: ");
        int a = sc.nextInt();
        int b = sc.nextInt();

        switch (choice) {
          case 1:
            System.out.println("Sum: " + (a + b));
            break;
          case 2:
            System.out.println("Difference: " + (a - b));
            break;
          case 3:
            System.out.println("Product: " + (a * b));
            break;
          case 4:
            if (b != 0)
              System.out.println("Quotient: " + (a / b));
            else
              System.out.println("Cannot divide by zero!");
            break;
        }
      } else if (choice != 5) {
        System.out.println("Invalid choice.");
      }
    } while (choice != 5);

    System.out.println("Calculator closed.");
  }

}
