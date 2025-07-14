package statements;

import java.util.Scanner;

public class LargestOfThree {

  public static void main(String[] args) {

    Scanner sc = new Scanner(System.in);
    System.out.print("Enter 3 numbers: ");
    int a = sc.nextInt();
    int b = sc.nextInt();
    int c = sc.nextInt();

    int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);
    System.out.println("Largest number is: " + max);
  }
}
