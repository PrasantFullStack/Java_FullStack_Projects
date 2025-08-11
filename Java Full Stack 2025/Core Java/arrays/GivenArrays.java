package arrays;

public class GivenArrays {
  // 12.) Java program – input array was
  // given [ 1,1,2,2,3,4,5,5,6,6],
  // Output – [3,4]

  public static void main(String[] args) {
    int[] arr = { 1, 1, 2, 2, 3, 4, 5, 5, 6, 6 };
    int[] result = findUniqueElements(arr);

    System.out.print("Unique elements: ");
    for (int num : result) {
      System.out.print(num + " ");
    }
  }

  public static int[] findUniqueElements(int[] arr) {
    boolean[] seen = new boolean[100]; // Assuming numbers are in range 0-99
    int uniqueCount = 0;

    for (int num : arr) {
      if (!seen[num]) {
        seen[num] = true;
        uniqueCount++;
      }
    }

    int[] uniqueElements = new int[uniqueCount];
    int index = 0;

    for (int i = 0; i < seen.length; i++) {
      if (seen[i]) {
        uniqueElements[index++] = i;
      }
    }

    return uniqueElements;
  }

}
