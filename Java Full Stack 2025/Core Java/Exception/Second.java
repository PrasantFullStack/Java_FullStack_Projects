package Exception;

public class Second {

  // what is exception in java?
  // An exception is an event that occurs during the execution of a program that
  // disrupts the normal flow of instructions.
  // It is an object that represents an error or an unexpected condition that
  // arises during the runtime of a program.
  // Exceptions can be caused by various factors, such as invalid input, resource
  // unavailability,
  // or programming errors.
  // what is ArrayIndexOutOfBoundsException in java?
  // ArrayIndexOutOfBoundsException is a runtime exception in Java that occurs
  // when an attempt is made to access an array element with an index that is
  // either negative or greater than or equal to the size of the array.
  // This exception indicates that the specified index is out of the valid range
  // for the array.
  public static void main(String[] args) {
    try {
      int[] arr = { 1, 2, 3 };
      System.out.println(arr[5]); // This will cause ArrayIndexOutOfBoundsException
      // why we use catch block?
      // A catch block is used to handle exceptions that may occur during the
      // execution of a program

    } catch (ArrayIndexOutOfBoundsException e) {
      // Handle the exception here
      // what is an ArrayIndexOutOfBoundsException in java?
      // ArrayIndexOutOfBoundsException is a runtime exception in Java that occurs
      // when an attempt is made to access an array element with an index that is
      // either negative or greater than or equal to the size of the array.
      // This exception indicates that the specified index is out of the valid range
      // for the array.
      System.out.println("Exception caught: Array index is out of bounds.");
    }
    System.out.println("Rest of the code...");
  }

  // why we use finally block in java?
  // The finally block is used in Java to define a block of code that will always
  // be executed, regardless of whether an exception is thrown or caught in the
  // try-catch block.
  // It is typically used for cleanup operations, such as closing resources like
}
// files, database connections, or network sockets, to ensure that they are
// properly released.
// The code inside the finally block will execute after the try block and any
// associated catch blocks, even if an exception occurs or if a return
// statement is encountered in the try or catch blocks.
// Example:
/*
 * try {
 * // code that may throw an exception
 * } catch (ExceptionType e) {
 * // code to handle the exception
 * } finally {
 * // code that will always be executed
 * }
 */
