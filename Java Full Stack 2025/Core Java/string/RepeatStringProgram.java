package string;

public class RepeatStringProgram {

  // Java program to find the longest without
  // repeating characters
  public static void main(String[] args) {
    String str = "Hello Prashant's World";
    StringBuilder repeatedChars = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
      char ch = str.charAt(i);
      // Append the character twice
      repeatedChars.append(ch).append(ch);
    }

    System.out.println("String with each character repeated: " + repeatedChars.toString());
  }
}
