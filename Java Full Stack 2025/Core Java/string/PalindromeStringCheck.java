package string;

public class PalindromeStringCheck {
  public static void main(String[] args) {
    String word = "madam";
    String reversed = "";

    // Reverse the string
    for (int i = word.length() - 1; i >= 0; i--) {
      reversed = reversed + word.charAt(i);
    }

    // Compare original with reversed
    if (word.equals(reversed)) {
      System.out.println("Palindrome String");
    } else {
      System.out.println("Not Palindrome String");
    }
  }
  // explanation: This program checks if a given string is a palindrome by
  // reversing the string and comparing it to the original.
  // It initializes an empty string to hold the reversed version, then uses a for
  // loop to iterate through the original string from the last character to the
}
