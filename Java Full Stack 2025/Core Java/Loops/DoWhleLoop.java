package Loops;

public class DoWhleLoop {
  // 1. What is do While loop?
  // ye bhi while loop hi jaisa hai. lekin isme pahle code chalega, phir condition
  // check hogi. To kam se kam 1 baar chalega hi
  // example: do{
  // //code to repeat
  // }while(condition);
  //
  public static void main(String[] args) {
    int myNumber = 1;

    do {
      System.out.println("Hello Dost:" + " " + myNumber);
      myNumber++;
    } while (myNumber <= 10);

  }

}
