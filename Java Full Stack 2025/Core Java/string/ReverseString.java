package string;

public class ReverseString {
  public static String reverse(String str) {
    if (str == null || str.isEmpty()) {
      return str;
    }
    StringBuilder reversed = new StringBuilder(str);
    return reversed.reverse().toString();
  }

  public static void main(String[] args) {
    String original = "Hello, Prashant Singh World!";
    String reversed = reverse(original);
    System.out.println("Original: " + original);
    System.out.println("Reversed: " + reversed);
  }

}
