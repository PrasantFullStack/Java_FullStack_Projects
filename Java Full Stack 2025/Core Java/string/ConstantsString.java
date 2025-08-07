package string;

// 9.) Java program to Count Vowels and Consonants in a given string 

public class ConstantsString {
  public static void main(String[] args) {
    String str = "Hello Prashant's World";
    int vowels = 0, consonants = 0;

    // Convert the string to lower case to simplify comparison
    str = str.toLowerCase();

    for (int i = 0; i < str.length(); i++) {
      char ch = str.charAt(i);
      if (ch >= 'a' && ch <= 'z') { // Check if character is a letter
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
          vowels++;
        } else {
          consonants++;
        }
      }
    }

    System.out.println("Number of Vowels: " + vowels);
    System.out.println("Number of Consonants: " + consonants);
  }
}