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
  // explanation: This program calculates the sum of the digits of a number using
  // a while loop.
  // It initializes a number and a sum variable, then repeatedly extracts the last
  // digit of the number using the modulus operator, adds it to the sum, and
  // removes the last digit from the number by dividing it by 10.
  // For example, if num = 164, the output will be:

}
