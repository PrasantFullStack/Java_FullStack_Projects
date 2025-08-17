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
  // explanation: This program prints all even numbers from 1 to 100.
  // It uses a for loop to iterate through numbers from 1 to 100 and checks
  // if a number is even by using the modulus operator (%).
  // If the number is even (i.e., divisible by 2), it prints the
  // number to the console.
  // For example, the output will include numbers like 2, 4, 6,
  // ..., 100.
  // This code can be used to generate a list of even numbers within a specified
  // range.
  // It can be useful in various applications where even numbers are required.
  // The program can be modified to change the range or to print odd numbers
  // by changing the condition in the if statement.
  // For instance, to print odd numbers, you would check if (i % 2 != 0).
  // This flexibility allows the code to be adapted for different requirements.
  // It is a simple and efficient way to demonstrate the use of loops and
  // conditional statements in Java.
  // The program can be extended to include more complex logic or to handle
  // user input for the range of numbers.
  // It serves as a basic example of how to work with loops and conditions in
  // Java.
  // The output will be printed to the console, showing each even number
  // found in the specified range.
  // This code can be used in educational contexts to teach basic programming
  // concepts such as loops, conditions, and arithmetic operations.
  // It can also be adapted for more complex scenarios where even numbers
  // need to be processed or stored in a data structure for further use.
  // The program is straightforward and easy to understand, making it suitable
  // for beginners learning Java programming.

}
