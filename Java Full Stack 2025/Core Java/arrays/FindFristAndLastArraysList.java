package arrays;

import java.util.ArrayList;

public class FindFristAndLastArraysList {
  // Find first and last element of
  // Arraylist

  public static void main(String[] args) {
    ArrayList<String> list = new java.util.ArrayList<>();
    list.add("Apple");
    list.add("Banana");
    list.add("Cherry");
    list.add("Date");

    if (!list.isEmpty()) {
      String firstElement = list.get(0);
      String lastElement = list.get(list.size() - 1);

      System.out.println("First element: " + firstElement);
      System.out.println("Last element: " + lastElement);
    } else {
      System.out.println("The list is empty.");
    }
  }
}
