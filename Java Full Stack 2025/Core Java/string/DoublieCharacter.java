package string;

public class DoublieCharacter {
  // Java program to print each letter twice from a given string
  public static void main(String[] args) {
    String str = "Hello Prashant's World";
    StringBuilder doubledChars = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
      char ch = str.charAt(i);
      // Append the character twice
      doubledChars.append(ch).append(ch);
    }

    System.out.println("String with each character doubled: " + doubledChars.toString());
  }
}
