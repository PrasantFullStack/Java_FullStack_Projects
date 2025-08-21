package statements;

import java.util.Scanner;

public class LargestOfThree {

  public static void main(String[] args) {

    Scanner sc = new Scanner(System.in);
    System.out.print("Enter 3 numbers: ");
    int a = sc.nextInt();
    int b = sc.nextInt();
    int c = sc.nextInt();

    int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);
    System.out.println("Largest number is: " + max);
  }

  // explanation: This program finds the largest of three numbers using the
  // ternary operator.
}
// It prompts the user to enter three numbers, then compares them using nested
// ternary operators to determine the largest number.
// For example, if the input numbers are 5, 10, and 3, the output will be:
// Largest number is: 10
// This code can be modified to handle more numbers or different data types.
// It uses the Scanner class to read input from the user and prints the largest