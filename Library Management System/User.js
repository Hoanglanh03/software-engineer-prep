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

module.exports = User;
