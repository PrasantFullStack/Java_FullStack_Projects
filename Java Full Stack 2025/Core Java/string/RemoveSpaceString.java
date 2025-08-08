package string;

public class RemoveSpaceString {

  // Java program to remove space from a given string
  public static void main(String[] args) {
    String str = "Hello Prashant's World";
    StringBuilder noSpaceString = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
      char ch = str.charAt(i);
      if (ch != ' ') { // Check if character is not a space
        noSpaceString.append(ch);
      }
    }

    System.out.println("String without spaces: " + noSpaceString.toString());
  }
}
