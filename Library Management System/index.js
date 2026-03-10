class LibraryItem {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.status = "Available";
  }

  checkout() {
    if (this.status === "Available") {
      this.status = "Checkout";
      console.log(`${this.title} has been checked out.`);
    } else {
      console.log(`${this.title} is not available for checkout.`);
    }
  }

  returnItem() {
    this.status = "Available";
    console.log(`${this.title} has been returned`);
  }
}

class Book extends LibraryItem {
  constructor(id, title, author) {
    super(id, title);
    this.author = author;
  }
}

class DVD extends LibraryItem {
  constructor(id, title, director) {
    super(id, title);
    this.director = director;
  }
}

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.borrowedItems = [];
  }

  borrowItem(item) {
    if (item.status === "Available") {
      item.checkout();
      this.borrowedItems.push(item);
    }
  }

  returnItem(item) {
    this.borrowedItems = this.borrowedItems.filter(
      (borrowedItem) => borrowedItem.id !== item.id,
    );
  }
}

class Library {
  constructor() {
    this.items = [];
    this.users = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  addUser(user) {
    this.users.push(user);
  }

  borrowItemForUser(userId, itemId) {
    const user = this.users.find((u) => u.id === userId);
    const item = this.items.find((i) => i.id === itemId);

    if (user && item) {
      user.borrowItem(item);
    }
  }

  returnItem(userId, itemId) {
    const user = this.users.find((u) => u.id === userId);
    const item = this.items.find((i) => i.id === itemId);
    if (!user || !item) {
      console.log("User or Item not found");
      return;
    }
    item.returnItem();
    user.returnItem(itemId);
  }

  listItems() {
    console.log("Library Items:");

    this.items.map((item) => {
      console.log({ ID: item.id, Title: item.title, Status: item.status });
    });

    console.log("Library Users:");
    this.users.map((user) => {
      console.log({ ID: user.id, Name: user.name });
    });

    const availableCount = this.items.filter(
      (item) => item.status === "Available",
    ).length;
    const checkoutCount = this.items.filter(
      (item) => item.status === "Checkout",
    ).length;

    console.log(`Total Items: ${this.items.length}`);
    console.log(`Available Items: ${availableCount}`);
    console.log(`Checked Out Items: ${checkoutCount}`);
  }
}

const library = new Library();

const book1 = new Book(1, "Harry Potter", "J.K Rowling");
const dvd1 = new DVD(2, "Avengers", "J.K Rowling");

library.addItem(book1);
library.addItem(dvd1);

const user1 = new User(1, "John");
const user2 = new User(2, "Lanh");
library.addUser(user1);
library.addUser(user2);

library.borrowItemForUser(1, 2);
library.returnItem(1, 1);
library.listItems();
