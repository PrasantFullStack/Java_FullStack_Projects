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
}
