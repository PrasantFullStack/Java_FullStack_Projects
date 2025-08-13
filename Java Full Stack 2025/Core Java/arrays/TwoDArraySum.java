package arrays;

public class TwoDArraySum {
  public static void main(String[] args) {
    // Sum of 2D Array Elements
    int[][] mat = {
        { 1, 2 },
        { 3, 4 },
        { 5, 6 }
    };

    int sum = 0;
    for (int i = 0; i < mat.length; i++) {
      for (int j = 0; j < mat[i].length; j++) {
        sum += mat[i][j];
      }
    }

    System.out.println("Sum of all elements: " + sum);
  }
  // This code calculates the sum of all elements in a 2D array.
  // It iterates through each row and column of the array,
  // adding each element to a total sum variable.
  // Finally, it prints the total sum to the console.
}
