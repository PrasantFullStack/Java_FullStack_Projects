package Operators;

public class LogicalOperator {
  // 1. What is a logical operator?
  // A logical operator is used to combine multiple boolean expressions and return
  // a
  // single boolean result. they are commonly used in conditional statements
  // and loops to control the flow of the proram based on multiple conditions.

  // 2. What are the different types of logical operators in Java?
  // | Operator | Description | Example |
  // | -------- | ----------- | ------- |
  // | && | Logical AND | `a && b` (true if both a and b are true) |
  // | || | Logical OR | `a || b` (true if either a or b is true) |
  // | ! | Logical NOT | `!a` (true if a is false) |

  public static void main(String[] args) {
    boolean a = true;
    boolean b = false;

    // Logical AND
    System.out.println("a && b: " + (a && b)); // false
    // Logical OR
    System.out.println("a || b: " + (a || b)); // true
    // Logical NOT
    System.out.println("!a: " + (!a)); // false
  }

}
