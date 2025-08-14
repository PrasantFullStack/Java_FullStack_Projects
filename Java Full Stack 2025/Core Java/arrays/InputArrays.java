package arrays;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InputArrays {
  // Java program – input array was
  // given [ 1,1,2,2,3,4,5,5,6,6],
  // Output – [3,4]

  public static void main(String[] args) {
    int[] array = { 1, 1, 2, 2, 3, 4, 5, 5, 6, 6 };
    List<Integer> result = findNonRepeatedElements(array);
    System.out.println("Non-repeated elements: " + result);
  }

  public static List<Integer> findNonRepeatedElements(int[] array) {
    // Step 1: Count occurrences of each element using a HashMap
    Map<Integer, Integer> countMap = new HashMap<>();
    for (int num : array) {
      countMap.put(num, countMap.getOrDefault(num, 0) + 1);
    }
    // Step 2: Identify elements with count equal to 1 (non repeated)
    List<Integer> nonRepeatedElements = new ArrayList<>();
    for (Map.Entry<Integer, Integer> entry : countMap.entrySet()) {
      if (entry.getValue() == 1) {
        nonRepeatedElements.add(entry.getKey());
      }
    }
    return nonRepeatedElements;
  }
}
