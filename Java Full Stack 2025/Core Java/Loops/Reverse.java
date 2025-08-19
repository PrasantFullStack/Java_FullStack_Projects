package loops;

public class Reverse {
  public static void main(String[] args) {
    int num = 898987, rev = 0;
    while (num != 0) {
      int digit = num % 10;
      rev = rev * 10 + digit;
      num /= 10;
    }
    System.out.println("Reversed Number: " + rev);
  }

  // explanation: This program reverses a given integer number.
  // It uses a while loop to extract each digit from the number by taking the
  // remainder when divided by 10, and constructs the reversed number by
  // multiplying the current reversed number by 10 and adding the extracted digit.
  // The process continues until the original number becomes 0.
  // For example, if the input is 12345, the output will be "Reversed Number:
  // 54321".
  // This code can be used to reverse any integer input by the user.
}
