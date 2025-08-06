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

}