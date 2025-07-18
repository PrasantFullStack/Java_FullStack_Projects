package arrays;

public class FindMaxArrays {
  public static void main(String[] args) {
    int[] arr = { 12, 45, 7, 89, 23 };
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
      if (arr[i] > max)
        max = arr[i];
    }
    System.out.println("Max = " + max);
  }
}
