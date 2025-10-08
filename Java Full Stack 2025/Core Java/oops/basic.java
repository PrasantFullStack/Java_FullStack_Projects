package oops;

//what is oops?
//object oriented programming system 
//class and objects
//class is a blueprint of objects
//object is an instance of class
public class basic {
  int x = 10; // non static variable
  static int y = 20; // static variable

  public static void main(String[] args) {
    basic obj = new basic(); // creating object of class
    System.out.println("Non static variable: " + obj.x);
    System.out.println("Static variable: " + y);
  }

}
