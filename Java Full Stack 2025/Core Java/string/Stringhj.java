public class Stringhj {
  // Example of a simple algorithm to reverse a string
  public static void main(String[] args) {
    String str = "Hello, World!";
    String reversedStr = reverseString(str);
    System.out.println("Reversed string: " + reversedStr);
  }

  public static String reverseString(String str) {
    StringBuilder reversed = new StringBuilder();
    for (int i = str.length() - 1; i >= 0; i--) {
      reversed.append(str.charAt(i));
    }
    return reversed.toString();
  }
  // explaination simple code to reverse a string
  // The code defines a class named Stringhj that contains a main method and a
  // reverseString method.
  // In the main method, a string is created and initialized with some text.
  // The reverseString method is called with the string as an argument, and the
  // reversed string is returned and printed to the console.
  // The reverseString method iterates through the string from the last character
  // to the first, appending each character to a StringBuilder.
  // Finally, it converts the StringBuilder to a string and returns it.
  // end of code
}
