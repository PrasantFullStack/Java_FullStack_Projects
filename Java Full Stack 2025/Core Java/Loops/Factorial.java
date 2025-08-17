package loops;

public class Factorial {
  public static void main(String[] args) {
    int number = 10;
    long factorial = 1;

    for (int i = 1; i <= number; i++) {
      factorial *= i;
    }
    System.out.println("Factorial :" + " " + factorial);
  }
  // explanation: This program calculates the factorial of a given number (10 in
  // this case).
  // It uses a for loop to multiply all integers from 1 to the specified number.
  // The result is stored in the variable 'factorial'.
  // For the input number 10, the output will be "Factorial : 3628800".
  // Factorial is a common mathematical operation used in permutations,
  // combinations,
  // and other mathematical calculations.
  // This code can be used to calculate the factorial of any non-negative integer.
  // Note: Factorial grows very quickly, so for larger numbers, the data type may
  // need to be changed to handle larger values (e.g., using BigInteger in Java).
  // This code can be useful in scenarios where factorial calculations are
  // required,
  // such as in combinatorial problems, probability calculations, or algorithmic
  // challenges.
  // It serves as a basic example of using loops and arithmetic operations in
  // Java.
}
