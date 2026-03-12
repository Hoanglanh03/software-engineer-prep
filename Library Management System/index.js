const Library = require("./Library");
const { Book, DVD } = require("./BookAndDVD");
const User = require("./User");

const library = new Library();

const books = Array.from(
  { length: 300 },
  (_, i) => new Book(i + 1, `Book ${i + 1}`, `Author ${i + 1}`, "Book"),
);

const dvds = Array.from(
  { length: 300 },
  (_, i) => new DVD(i + 301, `DVD ${i + 1}`, `Director ${i + 1}`, "DVD"),
);

books.forEach((b) => library.addItem(b));
dvds.forEach((d) => library.addItem(d));

const users = Array.from(
  { length: 1000000 },
  (_, i) => new User(i + 1, `User ${i + 1}`),
);
users.forEach((u) => library.addUser(u));

library.borrowItemForUser(1, 2);
library.returnItem(1, 1);

console.time("Binary Search Item");
console.log("Result Binary Item:", library.searchItem(library.users, 999));
console.timeEnd("Binary Search Item");

console.time("Linear Search Item");
for (let i = 0; i < 100000; i++) {
  library.searchUser(999);
}
console.timeEnd("Linear Search Item");

// library.listItems();
