package oops;

public class Encapsulation {
  // Encapsulation is the process of wrapping data and code together as a single
  // unit.
  // In encapsulation, the variables of a class will be hidden from other classes,
  // and can be accessed only through the methods of their current class.
  // Therefore, it is also known as data hiding.
  // To achieve encapsulation in Java:
  // 1. Declare the variables of a class as private.
  // 2. Provide public setter and getter methods to modify and view the variables
  // values.
  private String name;
  private int age;

  // getter method for name
  public String getName() {
    return name;
  }

  // setter method for name
  public void setName(String name) {
    this.name = name;
  }

  // getter method for age
  public int getAge() {
    return age;
  }

  // setter method for age
  public void setAge(int age) {
    this.age = age;
  }

  public static void main(String[] args) {
    Encapsulation obj = new Encapsulation();
    obj.setName("John");
    obj.setAge(25);
    System.out.println("Name: " + obj.getName());
    System.out.println("Age: " + obj.getAge());
  }
}
