package arrays;

public class ReverseArray {

  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 5 };
    System.out.print("Reversed: ");
    for (int i = arr.length - 1; i >= 0; i--) {
      System.out.print(arr[i] + " ");
    }
  }
  // This code reverses an array of integers and prints the reversed array.
  // It starts from the last element and iterates backward to the first element,
  // printing each element in reverse order.
  // For the input array {1, 2, 3, 4, 5}, the output will be "Reversed: 5 4 3 2
  // 1".
  // This code can be used to reverse any integer array and display the elements
  // in reverse order
  // without using any additional data structures.
  // It is a simple and efficient way to reverse an array in Java.
  // This code can be useful in scenarios where you need to display data in
  // reverse order,
  // such as reversing a list of numbers, strings, or any other data type stored
  // in an array.
  // It can also be adapted for more complex data structures or algorithms that
  // require reversing elements.

}
