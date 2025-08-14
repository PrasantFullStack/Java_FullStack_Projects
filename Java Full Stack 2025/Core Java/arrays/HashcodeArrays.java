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

}
