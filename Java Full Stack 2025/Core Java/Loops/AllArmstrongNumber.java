package loops;

public class AllArmstrongNumber {
  // Program: Print All ArmstrongNumber from 1 to 1000;
  public static void main(String[] args) {
    for (int number = 1; number <= 1000; number++) {
      int temp = number, sum = 0;
      while (temp != 0) {
        int digit = temp % 10;
        sum += digit * digit;
        temp /= 10;
      }
      if (sum == number) {
        System.out.println(number + " ");

      }
    }
  }
  // explanation: This program checks each number from 1 to 1000 to see if it is
  // an Armstrong number.
  // An Armstrong number is a number that is equal to the sum of its digits raised
  // to the power of the number of digits.
  // For example, 153 is an Armstrong number because 1^3 + 5^3 + 3^3 = 153.
  // The program iterates through each number, calculates the sum of the cubes of
  // its digits
  // using a while loop, and compares the sum to the original number.
  // If they are equal, it prints the number as an Armstrong number.
  // The output will be printed to the console, listing all Armstrong numbers
}
