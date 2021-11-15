const db = require('../db/mySQLconnection');

class InventoryModel {
  static findAll() {
    return db.execute(`
        SELECT *
        FROM inventories;
      `);
  }

  constructor(name, description = '') {
    this.name = name;
    this.description = description;
  }

  save() {
    return db.execute(`
          INSERT INTO inventories(
            name,
            description
          )
          VALUES('${this.name}','${this.description}')
        `);
  }
}

module.exports = InventoryModel;
