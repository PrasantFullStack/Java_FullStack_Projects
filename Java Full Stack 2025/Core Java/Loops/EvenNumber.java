package loops;

public class EvenNumber {
  public static void main(String[] args) {
    // Print all even numbers form 1 to 100 using a loop
    for (int i = 1; i <= 100; i++) {
      if (i % 2 == 0) {
        System.out.println("Even:" + " " + i);
      }
    }

  }

}
