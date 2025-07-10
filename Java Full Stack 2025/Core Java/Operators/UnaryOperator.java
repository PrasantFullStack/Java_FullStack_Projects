package Operators;

public class UnaryOperator {
  // Unary operators
  public static void main(String[] args) {
    int a = 5;
    int b = 10;

    // Unary plus operator
    System.out.println(+a); // Output: 5

    // Unary minus operator
    System.out.println(-a); // Output: -5

    // Increment operator
    System.out.println(++a); // Output: 6
    System.out.println(a++); // Output: 6 (then a becomes 7)
    System.out.println(a); // Output: 7

    // Decrement operator
    System.out.println(--b); // Output: 9
    System.out.println(b--); // Output: 9 (then b becomes 8)
    System.out.println(b); // Output: 8
  }
}
