package loops;

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
  // explanation: This program implements a simple menu-driven calculator.
  // It allows the user to perform addition, subtraction, multiplication, and
  // division
  // of two integers.
  // The user can choose an operation by entering a number from 1 to 4.
  // The program continues to prompt for operations until the user chooses to exit
  // by entering 5.
  // For example, if the user chooses 1 for addition and inputs 5 and 3,
  // the output will be "Sum: 8".
  // This code can be used as a basic calculator in console applications.
  // It demonstrates the use of methods for different operations and a loop for
  // menu navigation.
  // The program also handles division by zero by checking if the divisor is zero
  // before performing the division and printing an appropriate message if it is.
  // This can be extended to include more operations or features as needed.
  // It is a good example of how to structure a simple console application in
  // Java.
  // The program uses a do-while loop to keep displaying the menu until the user
  // chooses to exit.
  // It also includes input validation to ensure the user enters a valid choice.
  // The output will be printed to the console, showing the results of the chosen
  // operations.

}
