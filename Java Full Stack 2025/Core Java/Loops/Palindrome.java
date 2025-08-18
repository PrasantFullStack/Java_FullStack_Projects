package loops;

import java.util.Scanner;

public class Palindrome {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int num = sc.nextInt();
        int original = num, reverse = 0;

        while (num != 0) {
            reverse = reverse * 10 + num % 10;
            num /= 10;
        }

        if (original == reverse)
            System.out.println("Palindrome Number");
        else
            System.out.println("Not a Palindrome");
    }
    // explanation: This program checks if a given number is a palindrome.
    // A palindrome is a number that reads the same backward as forward.
    // The program takes an integer input, reverses it, and compares the reversed
    // number with the original number.
    // If they are the same, it prints "Palindrome Number"; otherwise, it prints
    // "Not a Palindrome".
    // For example, if the input is 121, the output will be "Palindrome Number".
    // This code can be used to check if any integer is a palindrome.
    // It can be easily modified to check for palindromic strings or other data
    // types by changing the input method and comparison logic.
    // The program is straightforward and demonstrates the use of loops and
    // conditionals in Java.
    // It is a good exercise for beginners to understand how to manipulate numbers
    // and implement basic algorithms.
    // The output will be printed to the console, indicating whether the input
    // number is a palindrome or not.
    // This code can be used in educational contexts to teach basic programming
    // concepts such as loops, conditions, and arithmetic operations.
    // It can also be adapted for more complex scenarios where palindromic numbers
    // need to be processed or stored in a data structure for further use.
    // The program is straightforward and easy to understand, making it suitable for
    // beginners learning Java programming.
}
