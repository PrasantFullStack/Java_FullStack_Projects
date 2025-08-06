package loops;

public class Test {
  public static void main(String[] args) {
    int num = 15;
    int a = 0, b = 1;

    for (int i = 2; i <= num; i++) {
      int c = a + b;
      System.out.println(c + " ");
      a = b;
      b = c;

    }

  }
}
