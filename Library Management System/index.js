const Library = require("./Library");
const { Book, DVD } = require("./BookAndDVD");  
const User = require("./User");

const library = new Library();

const book1 = new Book(1, "Harry Potter", "J.K. Rowling", "Book");
const dvd1 = new DVD(2, "Avengers", "Joss Whedon", "DVD");
const dvd3 = new DVD(3, "Iron Man", "Jon Favreau", "DVD");

library.addItem(book1);
library.addItem(dvd1);
library.addItem(dvd3);

const user1 = new User(1, "John");
const user2 = new User(2, "Lanh");
library.addUser(user1);
library.addUser(user2);

library.borrowItemForUser(1, 2);
library.returnItem(1, 1);
library.listItems();
