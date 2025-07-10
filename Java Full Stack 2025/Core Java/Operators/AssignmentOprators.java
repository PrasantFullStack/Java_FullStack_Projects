package Operators;

public class AssignmentOprators {
  // Assignment operators in Java
  // 1. What is an assignment operator?
  // An assignment operator is used to assign a value to a variable. The most
  // common assignment operator is '=', which assigns the value on the right to
  // the variable on the left.

  // //2. What are the different types of assignment operators in Java?
  // | Operator | Description | Example |
  // | -------- | ----------- | ------- |
  // | = | Simple assignment | `x = 10;` |
  // | += | Add and assign | `x += 5;` (equivalent to `x = x + 5;`) |
  // | -= | Subtract and assign | `x -= 3;` (equivalent to `x = x - 3;`) |
  // | *= | Multiply and assign | `x *= 2;` (equivalent to `x = x * 2;`) |
  // | /= | Divide and assign | `x /= 4;` (equivalent to `x = x / 4;`) |
  // | %= | Modulus and assign | `x %= 3;` (equivalent to `x = x % 3;`) |

  public static void main(String[] args) {
    // Example of assignment operators
    int myNumber = 1100; // Simple assignment
    System.out.println("Initial value of x: " + myNumber);
    // Add and assign
    System.out.println("After += 20: " + (myNumber += 20));

    // Subtract and assign
    int subValue = 120;
    System.out.println("After -= " + subValue + ": " + (myNumber -= subValue));

    // Multiply and assign
    System.out.println("After *= 22: " + (myNumber *= 22));

    // Divide and assign
    System.out.println("After /= 54: " + (myNumber /= 54));

    // Modulus and assign
    System.out.println("After %= 63: " + (myNumber %= 63));

    // Note: The assignment operators modify the value of the variable
  }

}
