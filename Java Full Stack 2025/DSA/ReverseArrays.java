public class ReverseArrays {
  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 5 };
    System.out.println("Original Array:");
    printArray(arr);

    reverseArray(arr);

    System.out.println("Reversed Array:");
    printArray(arr);
  }

  public static void reverseArray(int[] arr) {
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
      // Swap elements
      int temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left++;
      right--;
    }
  }

  public static void printArray(int[] arr) {
    for (int num : arr) {
      System.out.print(num + " ");
    }
    System.out.println();
  }
  // explanation: This code defines a Java class ReverseArrays that contains
  // methods to reverse an array and print its elements. The main method
  // initializes an array, prints the original array, reverses it using the
  // reverseArray method, and then prints the reversed array. The reverseArray
  // method swaps elements from the start and end of the array moving towards the
  // center, effectively reversing the array in place. The printArray method
  // iterates through the array and prints each element.
  //// Time Complexity: O(n) - where n is the number of elements in the array.
  //// Space Complexity: O(1) - no additional space is used that scales with input
  /// // size.
  /// // This is an efficient way to reverse an array in place.
  /// // Use Cases: This method can be used in scenarios where array manipulation
  // is
  /// // required, such as in algorithms that need to reverse data order.
  /// // Example: Input Array: [1, 2, 3, 4, 5] Output Array: [5, 4, 3, 2, 1].
  /// // Note: This implementation works for arrays of any data type by changing
  // the
  /// // array type in the method signatures.
}
