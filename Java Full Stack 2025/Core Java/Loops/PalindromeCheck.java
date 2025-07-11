package Loops;

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
}
