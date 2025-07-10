package Operators;

public class ArithmeticOperator {
  // Arthmetic operators in Java

  // | Operator | Description | Example |
  // | -------- | ----------- | ------- |
  // | + | Addition | `int sum = a + b;` |
  // | - | Subtraction | `int difference = a - b;` |
  // | * | Multiplication | `int product = a * b;` |
  // | / | Division | `int divi = a / b;` |
  // | % | Modulus | `int remainder = a % b;` |
  // | ++ | Increment | `a++;` or `++a;` |
  // | -- | Decrement | `a--;` or `--a;` |
  public static void main(String[] args) {
    int a = 102;
    int b = 53;

    // Addition
    int sum = a + b;
    System.out.println("Sum: " + sum);
    // Subtraction
    int sub = a - b;
    System.out.println("Subtraction: " + sub);
    // Multiplication
    int multi = a * b; // multi a *= b;
    System.out.println("Multiplication: " + multi);
    // Divisiona
    System.out.println("Division: " + (a / b));
    // Modulus
    System.out.println("Modulus: " + (a % b));
    // Increment
    System.out.println("Increment: " + (++a));
    // Decrement
    System.out.println("Decrement: " + (--b));
    // Increment and Decrement
    System.out.println("Increment and Decrement: " + (a++ + b--));

  }

}
