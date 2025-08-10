package arrays;

public class SortElements {
  // Sort an array without using in-built
  // method

  public static void main(String[] args) {
    int[] arr = { 5, 2, 8, 1, 3 };
    sortArray(arr);
    System.out.print("Sorted array: ");
    for (int num : arr) {
      System.out.print(num + " ");
    }
  }

  public static void sortArray(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          // Swap elements
          int temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
  }
  // this code ko explain kar do
  // This code sorts an array of integers in ascending order
  // using a simple bubble sort algorithm.
  // It iterates through the array, comparing each element with the others
  // and swapping them if they are out of order.
  // The sorted array is then printed to the console.
}
