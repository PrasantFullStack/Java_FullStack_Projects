package Operators;

public class BitwiseOperator {
  // what is bitwise operator?
  // Bitwise operators are used to perform operations on bits and are typically
  // used with integer types.
  public static void main(String[] args) {
    int a = 5; // Binary: 0101
    int b = 3; // Binary: 0011

    // Bitwise AND operator
    System.out.println("a & b: " + (a & b)); // Output: 1 (Binary: 0001)

    // Bitwise OR operator
    System.out.println("a | b: " + (a | b)); // Output: 7 (Binary: 0111)

    // Bitwise XOR operator
    System.out.println("a ^ b: " + (a ^ b)); // Output: 6 (Binary: 0110)
  }

  // Bitwise NOT operator
  // Inverts all bits of the operand
  // why use bitwiseNot operator?
  // The bitwise NOT operator is used to invert all bits of an integer, which can
  // be useful in various low-level programming tasks, such as implementing
  // certain algorithms or manipulating binary data.
  public static int bitwiseNot(int x) {
    return ~x; // Inverts all bits

  }

}
