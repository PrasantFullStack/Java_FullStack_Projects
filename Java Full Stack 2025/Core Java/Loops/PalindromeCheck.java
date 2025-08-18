package loops;

public class PalindromeCheck {
  public static void main(String[] args) {
    // Program:Check if a number is a palindrome
    int number = 121, original = number, reversed = 0;

    while (number != 0) {
      int digit = number % 10;
      reversed = reversed * 10 + digit;
      number = number / 10;

    }
    if (original == reversed) {
      System.out.println("Palindrome");

    } else {
      System.out.println("Not Palindrome");

    }
  }
  // explanation: This program checks if a given number is a palindrome.
  // A palindrome is a number that reads the same backward as forward.
  // The program takes an integer input, reverses it, and compares the reversed
  // number with the original number.
  // If they are the same, it prints "Palindrome"; otherwise, it prints
  // "Not Palindrome".
  // For example, if the input is 121, the output will be "Palindrome".
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
}
