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
  // It iterates through the array, checking each number to see if it is even or
  // odd, and increments the respective counters.
  // Finally, it prints the counts of even and odd numbers to the console.
  // The input array in this example is {1, 2, 3, 4, 5, 6, 7, 8, 9}.
  // The output will be:
  // Even count: 4
  // Odd count: 5
  // This code can be used to analyze the distribution of even and odd numbers
  // in any integer array.
  // It is a simple and efficient way to categorize numbers based on their parity.
  // The program can be easily modified to work with different input arrays by
  // changing the values in the `arr` variable.
}
