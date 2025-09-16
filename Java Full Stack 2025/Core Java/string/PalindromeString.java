package string;

public class PalindromeString {

  // Java program to check if a string is a palindrome
  public static void main(String[] args) {
    String str = "madam";
    String reversedStr = "";

    for (int i = str.length() - 1; i >= 0; i--) {
      reversedStr += str.charAt(i);
    }

    if (str.equals(reversedStr)) {
      System.out.println(str + " is a palindrome.");
    } else {
      System.out.println(str + " is not a palindrome.");
    }
  }
  // explanation: This program checks if a given string is a palindrome by
  // reversing the string and comparing it to the original.
  // It initializes an empty string to hold the reversed version, then uses a for
  // loop to iterate through the original string from the last character to the
  // first, appending each character to the reversed string.
  // Finally, it compares the original string with the reversed string using the
  // equals method and prints whether the string is a palindrome or not.

}
