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

// what is unchecked exception in java?
// Unchecked exceptions are exceptions that are not checked at compile-time.
// These
// exceptions do not need to be declared in the method signature or caught.
// Examples of unchecked exceptions include ArithmeticException,
// NullPointerException,
// ArrayIndexOutOfBoundsException, and IllegalArgumentException.
// what is error in java?
// Errors are serious problems that are not meant to be caught by the program.
// They are usually caused by issues outside the control of the program, such as
// hardware failures or resource exhaustion.
// Examples of errors include OutOfMemoryError, StackOverflowError, and
// VirtualMachineError.
// Note: It is generally recommended to handle checked exceptions and
// unchecked exceptions appropriately in your code, while errors are usually not
// meant to be caught or handled.
// why we use try and catch block in java?
// The try-catch block is used to handle exceptions in Java. It allows you to
// write code that may potentially throw an exception and provides a way to
// handle that exception gracefully without crashing the program.
// The code that may throw an exception is placed inside the try block, and the
// catch block is used to catch and handle the exception if it occurs.
// This helps in maintaining the normal flow of the program even when an
// exception occurs.
// Example:
// try {
// // code that may throw an exception
// } catch (ExceptionType e) {
// // code to handle the exception
// }