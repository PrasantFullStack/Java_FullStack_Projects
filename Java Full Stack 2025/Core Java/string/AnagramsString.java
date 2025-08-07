package string;

public class AnagramsString {

  // Java program to determine if Two Strings are Anagrams
  public static void main(String[] args) {
    String str1 = "Prashant";
    String str2 = "Prashant";

    if (areAnagrams(str1, str2)) {
      System.out.println(str1 + " and " + str2 + " are anagrams.");
    } else {
      System.out.println(str1 + " and " + str2 + " are not anagrams.");
    }
  }

  private static boolean areAnagrams(String str1, String str2) {
    if (str1.length() != str2.length()) {
      return false;
    }

    int[] charCount = new int[256];

    for (int i = 0; i < str1.length(); i++) {
      charCount[str1.charAt(i)]++;
      charCount[str2.charAt(i)]--;
    }

    for (int count : charCount) {
      if (count != 0) {
        return false;
      }
    }

    return true;
  }

}
