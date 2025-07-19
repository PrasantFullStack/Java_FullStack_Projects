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
}
