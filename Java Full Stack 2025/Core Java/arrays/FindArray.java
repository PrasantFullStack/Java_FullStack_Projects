package arrays;

public class FindArray {
  // Find Minimum and Maximum
  // from an Array
  public static void main(String[] args) {
    int[] arr = { 3, 5, 1, 8, 2 };
    int min = arr[0];
    int max = arr[0];

    for (int i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    System.out.println("Minimum value: " + min);
    System.out.println("Maximum value: " + max);
  }
  // explanation: This program finds the minimum and maximum values in an array.
  // It initializes min and max with the first element of the array and iterates
  // through the array to update min and max accordingly.
  // For the input array {3, 5, 1, 8, 2}, the output will be "Minimum value: 1"
  // and "Maximum value: 8".
  // This code can be used to determine the range of values in any integer array.

}
