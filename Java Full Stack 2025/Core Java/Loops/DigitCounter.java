package Loops;

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
