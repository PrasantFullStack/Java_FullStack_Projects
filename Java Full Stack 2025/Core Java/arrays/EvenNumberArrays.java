package arrays;

public class EvenNumberArrays {
  // 11 Java program to count Odd and
  // Even number from given array
  // Input: {1,2,3,4,5,6,7,8,9}

  public static void main(String[] args) {
    int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
    int evenCount = 0;
    int oddCount = 0;

    for (int num : arr) {
      if (num % 2 == 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }

    System.out.println("Even count: " + evenCount);
    System.out.println("Odd count: " + oddCount);
  }

  // explanation: This code counts the number of even and odd integers in a given
  // array.
}
