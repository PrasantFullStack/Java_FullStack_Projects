package Exception;

public class ExceptiomsExample {
  public static void main(String[] args) {
    // create all exception example in java
    int a = 10;
    int b = 0;
    int c = a / b; // This will cause ArithmeticException
    System.out.println("Result: " + c);
    String str = null;
    System.out.println(str.length()); // This will cause NullPointerException
    int[] arr = { 1, 2, 3 };
    System.out.println(arr[5]); // This will cause ArrayIndexOutOfBoundsException
    String s = "abc";
    int num = Integer.parseInt(s); // This will cause NumberFormatException
    System.out.println("Number: " + num);
    Object x = new Integer(0);
    System.out.println((String) x); // This will cause ClassCastException
  }

}
