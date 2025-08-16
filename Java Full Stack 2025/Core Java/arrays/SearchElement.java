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
    // Explanation: This program searches for a specific element (key) in an array.
    // It iterates through the array and checks if the key exists.

    // If found, it prints "Found"; otherwise, it prints "Not Found".
    // For the input array {11, 22, 33, 44,
    // 55} and key 33, the output will be "Found".
    // This code can be used to check for the presence of any integer in an array.
  }
}
