class DB {
  constructor() {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    if (!indexedDB) {
      console.error("你的浏览器不支持IndexedDB");
      return;
    }
    this.indexedDB = indexedDB;
    this.db = null;
    this.objectStore = null;
  }
  open(dbName, version) {
    if (!this.indexedDB) {
      return;
    }
    const request = indexedDB.open(dbName, version);
    return request;
  }
}

export default DB;
