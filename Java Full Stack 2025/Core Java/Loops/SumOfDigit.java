package loops;

public class SumOfDigit {
  // write a program: Find the sum of Digit a number using while loop.
  public static void main(String[] args) {
    int num = 164, sum = 0;

    while (num != 0) {
      int digit = num % 10;
      sum += digit;
      num = num / 10;
    }
    System.out.println("Sum :" + " " + sum);
  }

}
