class LibraryItem {
  constructor(id, title, type) {
    this.id = id;
    this.title = title;
    this.type = type;
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

module.exports = LibraryItem;