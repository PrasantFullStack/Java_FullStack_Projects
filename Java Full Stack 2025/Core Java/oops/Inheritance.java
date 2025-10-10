package oops;

public class Inheritance {
  // Inheritance is a mechanism in which one class acquires the properties
  // (fields)
  // and behaviors (methods) of a parent class.
  // It is an important part of OOPs (Object Oriented Programming System).
  // The class which inherits the properties of another class is called subclass
  // (derived class, child class).
  // The class whose properties are inherited by another class is called
  // superclass
  // (base class, parent class).
  // Inheritance represents the IS-A relationship.
  // Types of Inheritance:
  // 1. Single Inheritance
  // 2. Multilevel Inheritance
  // 3. Hierarchical Inheritance
  // Note: Java does not support multiple inheritance (a class cannot inherit from
  // more than one class) to avoid complexity and simplify the language.

  // Single Inheritance
  static class Animal {
    void eat() {
      System.out.println("Eating...");
    }
  }

  static class Dog extends Animal {
    void bark() {
      System.out.println("Barking...");
    }
  }

  // Multilevel Inheritance
  static class BabyDog extends Dog {
    void weep() {
      System.out.println("Weeping...");
    }
  }

  public static void main(String[] args) {
    BabyDog obj = new BabyDog();
    obj.eat(); // inherited from Animal class
    obj.bark(); // inherited from Dog class
    obj.weep(); // own method
  }

}
