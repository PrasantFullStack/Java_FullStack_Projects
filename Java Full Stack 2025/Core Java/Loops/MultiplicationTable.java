package loops;

import java.util.Scanner;

public class MultiplicationTable {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = sc.nextInt();

        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
    }
    // explanation: This program prints the multiplication table of a given number.
    // It prompts the user to enter a number and then uses a for loop to iterate
    // from 1 to 10, multiplying the input number by the loop index (i) to generate
    // the multiplication results.
    // For example, if the user inputs 5, the output will be:
    // 5 x 1 = 5
    // 5 x 2 = 10
    // 5 x 3 = 15
    // ...
    // This code can be used to generate multiplication tables for any integer input
    // provided by the user.
    // It utilizes the Scanner class to read input from the user and prints the
    // results to the console.
}
