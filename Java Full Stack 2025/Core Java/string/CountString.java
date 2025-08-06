package string;

public class CountString {
  // Program to count the number of vowels and consonants in a string

  // public static void main(String[] args) {
  // String input = "Hello, Prashant Singh World!";
  // int vowels = 0, consonants = 0;

  // for (char c : input.toCharArray()) {
  // if (Character.isLetter(c)) {
  // c = Character.toLowerCase(c);
  // if ("aeiou".indexOf(c) != -1) {
  // vowels++;
  // } else {
  // consonants++;
  // }
  // }
  // }

  // System.out.println("Number of vowels: " + vowels);
  // System.out.println("Number of consonants: " + consonants);
  // }

  // Java program to count the number of words in a string
  public static void main(String[] args) {
    String input = "Hello, Prashant Singh World!";
    int wordCount = 0;

    // Split the string by spaces and count the words
    String[] words = input.trim().split("\\s+");
    wordCount = words.length;

    System.out.println("Number of words: " + wordCount);
  }
}
