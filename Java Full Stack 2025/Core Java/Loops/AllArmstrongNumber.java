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
}
