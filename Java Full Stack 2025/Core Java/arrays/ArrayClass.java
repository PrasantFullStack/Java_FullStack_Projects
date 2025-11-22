package arrays;

public class ArrayClass {
  public static void main(String[] args) {
    // Example of array declaration and initialization in Java
    int[] arr = new int[5]; // size 5 array
    arr[0] = 10;
    arr[1] = 20;

    System.out.println("Array elements:");
    for (int i = 0; i < arr.length; i++) {
      System.out.println(arr[i]);
    }

  }
}
