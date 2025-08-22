package loops;

public class ReverseNumber {
  public static void main(String[] args) {
    int num = 123456789;
    int rev = 0;

    while (num != 0) {
      int digit = num % 10;
      rev = rev * 10 + digit;
      num /= 10;

    }
    System.out.println("Reverse Number :" + " " + rev);
    // explanation: This program reverses a given number using a while loop.
    // It initializes a number and a variable to hold the reversed number, then
    // repeatedly extracts the last digit of the number using the modulus operator,
  }
}
