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

}
