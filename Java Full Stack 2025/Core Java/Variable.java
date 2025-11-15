public class Variable {
  public static void main(String[] args) {
    // // Declare a variable
    int myNumber;
    myNumber = 10;
    // This is a comment explaining the variable
    // The variable myNumber is of type int and initialized to 10

    // Print the variable
    System.out.println("The value of myNumber is: " + myNumber);

    // Change the value of the variable
    myNumber = 20;
    // Print the new value
    System.out.println("The new value of myNumber is: " + myNumber);

    // Nameing Rules
    // 1. Variable names must start with a letter, underscore (_), or dollar sign
    // ($).
    // 2. Variable names can contain letters, digits, underscores, and dollar signs.
    // 3. Variable names are case-sensitive (e.g., myVariable and MyVariable are
    // different).
    // Best Practices
    // 1. Use meaningful names that describe the variable's purpose (e.g., myAge
    // instead of 20).
    // 2. Use camelCase for variable names (e.g., myVariableName).
    // 3. Avoid using single-letter variable names except in small scopes (e.g.,
    // loop counters).
    // 4. Avoid using reserved keywords (e.g., int, class, public) as variable
    // names.
    // 5. Keep variable names concise but descriptive.

    // //Primitives data types in Java
    // | Type | Size | Example |
    // | ------- | ------- | --------------------------- |
    // | byte | 1 byte | `byte b = 10;` |
    // | short | 2 bytes | `short s = 200;` |
    // | int | 4 bytes | `int age = 25;` |
    // | long | 8 bytes | `long phone = 9876543210L;` |
    // | float | 4 bytes | `float pi = 3.14f;` |
    // | double | 8 bytes | `double value = 123.456;` |
    // | char | 2 bytes | `char grade = 'A';` |
    // | boolean | 1 bit | `boolean isJavaFun = true;` |

    // // Non-primitive data types in Java
    // | Type | Example |
    // | ----------- | -------------------------------- ---|
    // | String | `String name = "John";` |
    // | Array | `int[] numbers = {1, 2, 3};` |
    // | Class | `class Person { String name; }` |
    // | Interface | `interface Animal { void sound(); }` |
    // | Enum | `enum Day { MONDAY, TUESDAY; }` |
    // | Collection | `List<String> list = new ArrayList<>();` |
    // | Map | `Map<String, Integer> map = new HashMap<>();` |
    // // Example of a class in Java
    // class Person {
    // String name; // Non-primitive data type
    // int age; // Primitive data type

  }

}