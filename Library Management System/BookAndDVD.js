const LibraryItem = require("./LibraryItem");

class DVD extends LibraryItem {
  constructor(id, title, director, type) {
    super(id, title, type);
    this.director = director;
  }
}

class Book extends LibraryItem {
  constructor(id, title, author, type) {
    super(id, title, type);
    this.author = author;
  }
}

module.exports = { DVD, Book }; 
