package statements;

import java.util.Scanner;

public class EvenOdd {
  public static void main(String[] args) {
    // int myNumber = 7;

    // if (myNumber % 2 == 0) {
    // System.out.println("My Number is Even:" + " " + myNumber);

    // } else {
    // System.out.println("My number is Odd:" + " " + myNumber);
    // }
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int num = sc.nextInt();

    if (num % 2 == 0) {
      System.out.println(num + " is Even");
    } else {
      System.out.println(num + " is Odd");
    }
  }
  // explanation: This program checks if a number is even or odd.
  // It uses the modulus operator (%) to determine if the number is divisible by
  // 2.
  // If the remainder is 0, the number is even; otherwise, it is odd.
  // For example, if the input number is 7, the output will be:

}
