package arrays;

public class SearchElement {
  public static void main(String[] args) {
    int[] arr = { 11, 22, 33, 44, 55 };
    int key = 33;
    boolean found = false;

    for (int num : arr) {
      if (num == key) {
        found = true;
        break;
      }
    }
    System.out.println(found ? "Found" : "Not Found");
  }
}
