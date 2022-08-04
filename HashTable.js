class HashEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor() {
    this.bucket = new Array();
  }

  _hash(key) {
    let hash = 0;
    if (key.length === 0) return hash;
    for (let i = 0; i < key.length; i++) {
      let charCode = key.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0; // Convert to 32bit integer
    }
    return hash % this.slots;
  }

  set(key, value) {
    const index = this._hash(key);
    let currentEntry = this.bucket[index];
    if (currentEntry) {
      let lastVisitedEntry;
      while (currentEntry) {
        lastVisitedEntry = currentEntry;
        if (currentEntry.key === key) {
          currentEntry.value = value;
          return;
        }
        currentEntry = currentEntry.next;
      }
      let newEntry = new HashEntry(key, value);
      lastVisitedEntry.next = newEntry;
    } else {
      let newEntry = new HashEntry(key, value);
      this.bucket[index] = newEntry;
    }
  }

  get(key) {
    const index = this._hash(key);
    let currentEntry = this.bucket[index];
    if (currentEntry) {
      while (currentEntry) {
        if (currentEntry.key === key) return currentEntry.value;
        currentEntry = currentEntry.next;
      }
    }
    return undefined;
  }

  remove(key) {
    const index = this._hash(key);
    let currentEntry = this.bucket[index];
    if (currentEntry) {
      let lastVisitedEntry;
      while (currentEntry) {
        if (currentEntry.key === key) {
          // if this is the only entry on the index, set the index back to null
          if (!!!lastVisitedEntry) {
            this.bucket[index] = null;
            return true;
          }
          // remove the current entry from the linked list
          lastVisitedEntry.next = currentEntry.next;
          return true;
        }
        lastVisitedEntry = currentEntry;
        currentEntry = currentEntry.next;
      }
    } else return false;
  }

  display() {
    this.bucket.forEach((entry, index) => {
      const chainedValues = this.getArrayFromEntry(entry);
      console.log(`${index}: `, chainedValues);
    });
  }

  getArrayFromEntry(entry) {
    const valuesArray = [];
    let currentEntry = entry;
    while (currentEntry) {
      valuesArray.push([currentEntry.key, currentEntry.value]);
      currentEntry = currentEntry.next;
    }
    return valuesArray;
  }
}

const ht = new HashTable();
ht.set("yoni", 23);
ht.set("yoin", 22);
ht.set("yoni", 23);
ht.set("x", 24);
ht.display();
console.log(ht.get("yoni"));
console.log(ht.get("yoin"));
console.log(ht.remove("yoin"));
console.log(ht.get("yoin"));
console.log(ht.get("x"));
console.log(ht.remove("x"));
console.log(ht.get("x"));
ht.display();
