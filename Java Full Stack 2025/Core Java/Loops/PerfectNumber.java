package loops;

//Perfect Number: Sum of divisors (excluding it self) = number
//Example: 28 -> 1+2+4+7+14= 28
public class PerfectNumber {
  public static void main(String[] args) {
    int num = 28, sum = 0;

    for (int i = 1; i < num; i++) {
      if (num % i == 0) {
        sum += i;

      }
      if (sum == num) {
        System.out.println("Perfect Number :" + " " + sum);

      } else {
        System.out.println("Not perfect Number:" + " " + sum);

      }
    }
  }

  // explanation: This program checks if a number is a perfect number.
  // A perfect number is a positive integer that is equal to the sum of its proper
  // divisors (excluding itself).
  // For example, 28 is a perfect number because its divisors (1, 2, 4, 7, 14) sum
  // up to 28.
  // The program iterates through all numbers less than the given number, checks
  // if they are divisors,
  // and sums them up. If the sum equals the original number, it prints that the
  // number is perfect; otherwise, it indicates that it is not.
  // The output will be printed to the console, indicating whether the input
  // number is a perfect number or not.
  // This code can be used in educational contexts to teach basic programming
  // concepts such as loops,
}
