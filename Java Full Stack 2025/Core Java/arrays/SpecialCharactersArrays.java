package arrays;

public class SpecialCharactersArrays {
  // Array consists of integers and special
  // characters,sum only integers
  public static void main(String[] args) {
    String[] arr = { "1", "2", "3", "@", "#", "4" };
    int sum = 0;

    for (String str : arr) {
      try {
        sum += Integer.parseInt(str);
      } catch (NumberFormatException e) {
        // Ignore non-integer values
      }
    }

    System.out.println("Sum of integers: " + sum);
  }
  // explanation: This program calculates the sum of integers in an array that
  // may contain special characters.
  // It iterates through the array, attempts to parse each element as an integer,
  // and adds it to the sum if successful.
  // Non-integer values are ignored.
  // For the input array ["1", "2", "3", "@", "#", "4"], the output will be
  // "Sum of integers: 10".

}
