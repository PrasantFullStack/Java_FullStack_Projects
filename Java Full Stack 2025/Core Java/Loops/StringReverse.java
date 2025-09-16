package loops;

public class StringReverse {
  public static void main(String[] args) {
    String str = "Hello, Prashant Singh World!";
    String reversedStr = "";
    int length = str.length();

    for (int i = length - 1; i >= 0; i--) {
      reversedStr += str.charAt(i);
    }

    System.out.println("Original String: " + str);
    System.out.println("Reversed String: " + reversedStr);
  }

  // explanation: This program reverses a given string using a for loop.
  // It initializes a string and an empty string to hold the reversed version.
  // The loop iterates from the end of the original string to the beginning,
  // appending each character to the reversed string.
  // Finally, it prints both the original and reversed strings.
  // For example, if the input is "Hello", the output will be "olleH".
} // appends it to the reversed number, and removes the last digit from the
// original number by dividing it by 10.
// The process continues until the original number becomes 0.
// Finally, it prints the reversed number.
// For example, if the input is 12345, the output will be "Reversed Number:
// 54321".
// This code can be used to reverse any integer input by the user.