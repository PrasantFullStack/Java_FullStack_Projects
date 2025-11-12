package Exception;

public class ExceptiomsExample {
  public static void main(String[] args) {
    // create all exception example in java
    int a = 10;
    int b = 0;
    int c = a / b; // This will cause ArithmeticException
    System.out.println("Result: " + c);
    String str = null;
    System.out.println(str.length()); // This will cause NullPointerException
    int[] arr = { 1, 2, 3 };
    System.out.println(arr[5]); // This will cause ArrayIndexOutOfBoundsException
    String s = "abc";
    int num = Integer.parseInt(s); // This will cause NumberFormatException
    System.out.println("Number: " + num);

    // what is exception in java?
    // An exception is an event that occurs during the execution of a program that
    // disrupts the normal flow of instructions.
    // Types of Exceptions in Java:
    // 1. Checked Exceptions: These are exceptions that are checked at compile-time.
    // Examples: IOException, SQLException
    // 2. Unchecked Exceptions: These are exceptions that are not checked at
    // compile-time. Examples: ArithmeticException, NullPointerException,
    // ArrayIndexOutOfBoundsException, NumberFormatException
    // 3. Errors: These are serious problems that a reasonable application should
    // not
    // try to catch. Examples: OutOfMemoryError, StackOverflowError
    // Exception Handling in Java:
    // Java provides a robust exception handling mechanism using the try, catch,
  }

}
// finally, throw, and throws keywords.
// try block is used to enclose the code that may throw an exception.
// catch block is used to handle the exception.
// finally block is used to execute the code that must be executed whether an
// exception occurs or not.
// throw keyword is used to explicitly throw an exception.
// throws keyword is used to declare the exceptions that a method may throw.
// Example of Exception Handling in Java:
// try {
// int result = a / b; // This may throw ArithmeticException
// System.out.println("Result: " + result);
// } catch (ArithmeticException e) {
// System.out.println("Error: Division by zero is not allowed.");
// } finally {
// System.out.println("Execution completed.");
// }
// Explanation: This code defines a Java class ExceptiomsExample that
// demonstrates
// various types of exceptions in Java, including ArithmeticException,
// NullPointerException, ArrayIndexOutOfBoundsException, and
// NumberFormatException.
// The main method contains code that will throw these exceptions when executed.
//  It also provides a brief explanation of exceptions in Java, their types,