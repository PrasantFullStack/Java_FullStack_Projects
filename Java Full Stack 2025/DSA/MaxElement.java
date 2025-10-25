package DSA;

public class MaxElement {
  // Example of a simple algorithm to find the maximum element in an array
  public static void main(String[] args) {
    int[] arr = { 3, 5, 2, 8, 1 };
    int max = findMax(arr);
    System.out.println("Maximum element: " + max);
  }

  public static int findMax(int[] arr) {
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  // exlaination simple code to find the maximum element in an array
  // The code defines a class named MaxElement that contains a main method and a
  // findMax method.
  // In the main method, an array of integers is created and initialized with some
  // values.
  // The findMax method is called with the array as an argument, and the maximum
  // element is returned and printed to the console.
  // The findMax method iterates through the array, comparing each element to the
  // current maximum value.
  // If a larger element is found, it updates the maximum value.

}
