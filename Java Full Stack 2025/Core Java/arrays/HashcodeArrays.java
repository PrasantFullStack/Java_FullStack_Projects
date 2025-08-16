package arrays;

import java.util.Objects;

public class HashcodeArrays {
  // Java program to implement hashcode and equals
  // for arrays using Objects class

  public static void main(String[] args) {
    int[] arr1 = { 1, 2, 3 };
    int[] arr2 = { 1, 2, 3 };

    // Using Objects.hashCode to get hashcode of arrays
    int hash1 = Objects.hash(arr1);
    int hash2 = Objects.hash(arr2);

    System.out.println("Hashcode of arr1: " + hash1);
    System.out.println("Hashcode of arr2: " + hash2);

    // Checking equality of arrays
    boolean areEqual = Objects.deepEquals(arr1, arr2);
    System.out.println("Are arr1 and arr2 equal? " + areEqual);
  }

  // Explanation: This program demonstrates how to use the Objects class to
  // compute hashcodes for arrays and check their equality.
  // It uses Objects.hash to get the hashcode of each array and
  // Objects.deepEquals to compare the arrays for equality.
  // For the input arrays {1, 2, 3} and {1, 2, 3}, the output will show that both
  // arrays have the same hashcode and are equal.
  // This code can be useful when working with collections of arrays or when
  // implementing custom data structures that require hashcodes and equality
  // checks.
  // It simplifies the process of comparing arrays and ensures that the hashcode
  // generation is consistent with the contents of the arrays.

}
