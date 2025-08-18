package loops;

public class HollowRectangle {

  public static void main(String[] args) {
    int rows = 4, cols = 5;

    for (int i = 1; i <= rows; i++) {
      for (int j = 1; j <= cols; j++) {
        if (i == 1 || i == rows || j == 1 || j == cols)
          System.out.print("*");
        else
          System.out.print(" ");
      }
      System.out.println();
    }
  }

  // explanation: This program prints a hollow rectangle pattern using asterisks
  // (*).
  // It uses nested loops to iterate through rows and columns.
  // The outer loop iterates through each row, while the inner loop iterates
  // through each column.
  // If the current position is on the border of the rectangle (first or last
  // row/column),
  // it prints an asterisk; otherwise, it prints a space.
  // For rows = 4 and cols = 5, the output will be:
  // *****
  // * *
  // * *
  // *****
  // This code can be used to create a hollow rectangle pattern of any size by
  // changing the values of rows and cols.
  // It is a simple example of using loops to create patterns in Java.
}
