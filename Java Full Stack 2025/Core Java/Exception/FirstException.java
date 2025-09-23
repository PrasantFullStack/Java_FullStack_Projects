package Exception;
//what is exception in java?

//An exception is an event that occurs during the execution of a program that disrupts the normal flow of instructions.

//It is an object that represents an error or an unexpected condition that arises during the runtime of a program.

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
