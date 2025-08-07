package string;

public class EvenIndex {

  // Java program to print unqiue characters
  public static void main(String[] args) {
    String str = "Hello Prashant's World";
    StringBuilder uniqueChars = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
      char ch = str.charAt(i);
      if (i % 2 == 0 && uniqueChars.indexOf(String.valueOf(ch)) == -1) {
        uniqueChars.append(ch);
      }
    }

    System.out.println("Unique characters at even indices: " + uniqueChars.toString());
  }
}
