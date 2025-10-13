package Exception;
//what is exception in java?

//An exception is an event that occurs during the execution of a program that disrupts the normal flow of instructions.

//It is an object that represents an error or an unexpected condition that arises during the runtime of a program.
//Exceptions can be caused by various factors, such as invalid input, resource unavailability, or programming errors.

public class FirstException {
  public static void main(String[] args) {
    try {
      int data = 100 / 0; // This will cause ArithmeticException
    } catch (ArithmeticException e) {
      System.out.println("Exception caught: Division by zero is not allowed.");
    }
    System.out.println("Rest of the code...");
  }

}
// how many types of exception in java?
// 1. Checked Exception
// 2. Unchecked Exception
// 3. Error
// what is checked exception in java?
// Checked exceptions are exceptions that are checked at compile-time. These
// exceptions must be either caught or declared in the method signature using
// the throws keyword.
// Examples of checked exceptions include IOException, SQLException, and
// ClassNotFoundException.