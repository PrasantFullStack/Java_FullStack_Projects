package oops;

public class Aggregation {
  // Aggregation is a special form of association where one class is a part of
  // another class.
  // It represents a "has-a" relationship.
  // In aggregation, the lifetime of the part class is not managed by the whole
  // class.
  // Example: A library has books. The library can exist without books, and
  // books can exist without the library.

  static class Library {
    String name;

    Library(String name) {
      this.name = name;
    }
  }

  static class Book {
    String title;
    Library library; // Aggregation: Book has a reference to Library

    Book(String title, Library library) {
      this.title = title;
      this.library = library;
    }

    void display() {
      System.out.println("Book: " + title + ", Library: " + library.name);
    }
  }

  public static void main(String[] args) {
    Library lib = new Library("City Library");
    Book book1 = new Book("Java Programming", lib);
    Book book2 = new Book("Data Structures", lib);
    book1.display();
    book2.display();
  }

}
