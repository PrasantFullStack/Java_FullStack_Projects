package oops;

public class Association {
  // Association is a relationship between two classes where one class uses or
  // interacts with another class.
  // It represents a "uses-a" or "has-a" relationship.
  // In association, objects of one class can be associated with objects of
  // another class.
  // There are two types of association:
  // 1. Unidirectional Association: In this type of association, one class is
  // aware of the other class, but the other class is not aware of the first
  // class.
  // Example: A teacher teaches students. The teacher knows about the students,
  // but the students do not know about the teacher.
  static class Teacher {
    String name;

    Teacher(String name) {
      this.name = name;
    }

    void teach(Student student) {
      System.out.println(this.name + " is teaching " + student.name);
    }
  }

  static class Student {
    String name;

    Student(String name) {
      this.name = name;
    }
  }

  public static void main(String[] args) {
    Teacher teacher = new Teacher("Mr. Prashant");
    Student student = new Student("John");
    teacher.teach(student);
  }
}
