package string;

public class PermutationsString {
  // permutations of a string
  public static void main(String[] args) {
    String str = "abc";
    System.out.println("Permutations of " + str + ":");
    permute(str, 0, str.length() - 1);
  }

  private static void permute(String str, int left, int right) {
    if (left == right) {
      System.out.println(str);
    } else {
      for (int i = left; i <= right; i++) {
        str = swap(str, left, i);
        permute(str, left + 1, right);
        str = swap(str, left, i); // backtrack
      }
    }
  }

  private static String swap(String str, int i, int j) {
    char[] charArray = str.toCharArray();
    char temp = charArray[i];
    charArray[i] = charArray[j];
    charArray[j] = temp;
    return new String(charArray);
  }
}
