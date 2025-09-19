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
  // first, appending each character to the reversed string.
  // Finally, it compares the original string with the reversed string using the
  // equals method and prints whether the string is a palindrome or not.
  // For example, if the input is "madam", the output will be "Palindrome String".

}
