package loops;

import java.util.Scanner;

public class DigitCounter {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int num = sc.nextInt();
    int count = 0;

    while (num != 0) {
      num /= 10;
      count++;
    }

    System.out.println("Total digits: " + count);
  }
}
// explanation: This program counts the number of digits in a given integer.
// It uses a while loop to repeatedly divide the number by 10 until it becomes 0
// and increments a counter for each division.
// The final count is printed to the console.
// For example, if the input is 12345, the output will be "Total digits: 5".
// This code can be used to determine the length of any integer input by the
// user.
// It utilizes the Scanner class to read input from the user.