package arrays;

public class EvenOddCount {

  public static void main(String[] args) {
    int[] arr = { 10, 21, 4, 7, 13, 8 };
    int even = 0, odd = 0;
    for (int num : arr) {
      if (num % 2 == 0)
        even++;
      else
        odd++;
    }
    System.out.println("Even: " + even + ", Odd: " + odd);
  }
}
