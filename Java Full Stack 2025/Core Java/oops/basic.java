package oops;

//what is oops?
//object oriented programming system 
//class and objects
//class is a blueprint of objects
//object is an instance of class
//class is a collection of objects
//class is a collection of variables and methods
//class is a collection of data members and member functions
//class is a collection of attributes and behaviors
//OOPS is a programming paradigm
////OOPS is a way of programming
//OOPS is a way of designing software
// Oops pillars
//1. Abstraction
//2. Encapsulation
//3. Inheritance
//4. Polymorphism
//5. Association
//6. Aggregation
//7. Composition
//8. Coupling

public class basic {
  int x = 10; // non static variable
  static int y = 20; // static variable

  public static void main(String[] args) {
    basic obj = new basic(); // creating object of class
    System.out.println("Non static variable: " + obj.x);
    System.out.println("Static variable: " + y);
  }// end of main
   // end of class
   // explaination of code
   // The code defines a class named basic that contains a non-static variable x
   // and a
   // static variable y.
   // In the main method, an object of the basic class is created to access the
   // non-static variable x.
   // The static variable y is accessed directly using the class name.

  /// what is defference between java 8, java 11, java 17, 21?
  /// Java 8: Released in March 2014, Java 8 introduced significant features such
  /// as lambda expressions, the Stream API, and the new Date and Time API. It
  /// also brought default methods in interfaces and the Nashorn JavaScript
  /// engine.
  /// Java 11: Released in September 2018, Java 11 is a Long-Term Support (LTS)
  /// version. It introduced features like the HTTP Client API, local-variable
  /// syntax for lambda parameters, and the removal of the Java EE and CORBA
  /// modules.
  /// Java 17: Released in September 2021, Java 17 is also an LTS version. It
  /// includes features like sealed classes, pattern matching for switch
  /// expressions, and enhanced pseudo-random number generators.
  /// Java 21: Released in September 2023, Java 21 is the latest LTS version. It
  /// introduces features like record patterns, virtual threads (Project Loom),
  /// and structured concurrency, enhancing the language's capabilities for
  /// modern application development.
  /// end of explanation

}
