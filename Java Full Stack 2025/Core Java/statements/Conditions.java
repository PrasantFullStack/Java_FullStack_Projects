package statements;

public class Conditions {
  // If else conditions
  // This program demonstrates the use of if-else statements in Java.
  // why use if-else statements?
  // If-else statements are used to execute different blocks of code based on
  // certain conditions.
  // They allow for decision-making in the code, enabling different actions based
  // on the evaluation of conditions.
  // Example: Checking if a number is positive, negative, or zero

  // Home work: Write a program that checks if a age 18 or less, 18 to 60, or
  // above 60

  public static void main(String[] args) {
    int number = 10;
    // Check if the number is positive, negative, or zero
    if (number > 0) {
      System.out.println("The number is positive.");
    } else if (number < 0) {
      System.out.println("The number is negative.");
    } else {
      System.out.println("The number is zero.");
    }

  }
  // Output: The number is positive.
  // Explanation: The program checks the value of the variable 'number'.
  // Since it is greater than 0, the first condition is true, and the
  // corresponding
  // block is executed, printing "The number is positive."
}
