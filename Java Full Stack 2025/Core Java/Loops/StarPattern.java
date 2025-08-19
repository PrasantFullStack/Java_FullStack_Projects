package loops;

public class StarPattern {

  public static void main(String[] args) {
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
      for (int j = 1; j <= i; j++) {
        System.out.print("* ");
      }
      System.out.println();
    }
  }
  // explanation: This program prints a right-angled triangle pattern using
  // asterisks (*).
  // It uses nested loops where the outer loop controls the number of rows and the
  // inner loop
  // controls the number of asterisks printed in each row.
  // For example, if rows = 5, the output will be:
  // *
  // * *
  // * * *
  // * * * *
  // * * * *
  // This code can be modified to change the number of rows or the character used
  // for the
  // pattern.

}
