package loops;

public class DiamondPattern {

  public static void main(String[] args) {
    int myNumber = 5;

    // upper half
    for (int myPattern = 1; myPattern <= myNumber; myPattern++) {
      for (int space = 1; space <= myNumber - myPattern; space++) {
        System.out.print(" ");
      }
      for (int star = 1; star <= (2 * myPattern - 1); star++) {
        System.out.print("*");
      }
      System.out.println();
    }
    // lower half
    for (int myPattern = myNumber - 1; myPattern >= 1; myPattern--) {
      for (int space = 1; space <= myNumber - myPattern; space++) {
        System.out.print(" ");
      }
      for (int star = 1; star <= (2 * myPattern - 1); star++) {
        System.out.print("*");
      }
      System.out.println();
    }
  }
  // explanation: This program prints a diamond pattern using asterisks (*).
  // It first prints the upper half of the diamond by iterating through rows,
  // printing spaces and stars accordingly.
  // Then, it prints the lower half of the diamond in a similar manner.
  // The number of rows in the diamond is determined by the variable myNumber.
  // For myNumber = 5, the output will be:
  // *
  // *****
  // *********
  // *************
  // ***************
}