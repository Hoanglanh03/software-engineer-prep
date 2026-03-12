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

  searchUser(userId) {
    const user = this.users.find((u) => u.id === userId);
    return user;
  }

  searchItem(Items, KeyId) {
    let left = 0;
    let right = Items.length-1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (Items[mid].id === KeyId) {
        return Items[mid];
      } else if (Items[mid].id < KeyId) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return console.log("not search number");
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
      console.log({
        ID: item.id,
        Title: item.title,
        Type: item.type,
        Status: item.status,
      });
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

    // console.log(`Total Items: ${this.items.length}`);
    // console.log(`Available Items: ${availableCount}`);
    // console.log(`Checked Out Items: ${checkoutCount}`);
  }
}

module.exports = Library;
