package string;

public class PalindromeStringCheck {
  public static void main(String[] args) {
    String word = "mad";
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
}
