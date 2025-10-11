package oops;

public class Composition {
  // Composition is a special form of association where one class is a part of
  // another class, and the lifetime of the part class is managed by the whole
  // class.
  // It represents a "contains-a" relationship.
  // In composition, the part class cannot exist without the whole class.
  // Example: A house has rooms. The house cannot exist without rooms, and rooms
  // cannot exist without the house.

  static class House {
    String address;
    Room room1; // Composition: House contains Room
    Room room2; // Composition: House contains Room

    House(String address) {
      this.address = address;
      this.room1 = new Room("Living Room");
      this.room2 = new Room("Bedroom");
    }

    void display() {
      System.out.println("House Address: " + address);
      room1.display();
      room2.display();
    }
  }

  static class Room {
    String name;

    Room(String name) {
      this.name = name;
    }

    void display() {
      System.out.println("Room: " + name);
    }
  }

  public static void main(String[] args) {
    House house = new House("123 Main St");
    house.display();
  }
}
