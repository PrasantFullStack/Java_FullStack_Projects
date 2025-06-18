public class ReverseString {
  public static void main(String[] args) {
    String str = "Java Full stack developer";
    String revStr = "";
    for (int i = str.length() - 1; i >= 0; i--) {
      reverseStr += str.charAt(i);
    }
    System.out.println(revStr);
  }

}
