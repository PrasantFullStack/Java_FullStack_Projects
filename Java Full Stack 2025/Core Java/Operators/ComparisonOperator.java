package Operators;

public class ComparisonOperator {
  // Relational/Comparison operators in Java
  // 1. What is a comparison operator?
  // A comparison operator is used to compare two values and return a boolean
  // result (true or false). They are commonly used in conditional statements and
  // loops to control the flow of the program based on certain conditions.

  // 2. What are the different types of comparison operators in Java?
  // | Operator | Description | Example |
  // | -------- | ----------- | ------- |
  // | == | Equal to | `a == b` (true if a is equal to b) |
  // | != | Not equal to | `a != b` (true if a is not equal to b) |
  // | > | Greater than | `a > b` (true if a is greater than b) |
  // | < | Less than | `a < b` (true if a is less than b) |
  // | >= |Greater than or equal to | `a >= b` (true if a is greater than or equal
  // to b) |
  // | <= | Less than or equal to | `a <= b` (true if a is less than or equal to
  // b)
  public static void main(String[] args) {
    int a = 10;
    int b = 20;

    // Equal to
    System.out.println("a == b: " + (a == b)); // false
    // Not equal to
    System.out.println("a != b: " + (a != b)); // true
    // Greater than
    System.out.println("a > b: " + (a > b)); // false
    // Less than
    System.out.println("a < b: " + (a < b)); // true
    // Greater than or equal to
    System.out.println("a >= b: " + (a >= b)); // false
    // Less than or equal to
    System.out.println("a <= b: " + (a <= b)); // true
  }
}
