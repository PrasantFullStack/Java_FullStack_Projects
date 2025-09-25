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
    } catch (ArrayIndexOutOfBoundsException e) {
      System.out.println("Exception caught: Array index is out of bounds.");
    }
    System.out.println("Rest of the code...");
  }
}
