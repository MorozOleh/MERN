const db = require('../db/mySQLconnection');

class UserModel {
  static findEmail(email) {
    return db.execute(`
      SELECT *
      FROM people
      WHERE email = '${email}'
    `);
  }
  constructor({ name, last_name, email, password }) {
    (this.first_name = name),
      (this.last_name = last_name),
      (this.email = email),
      (this.password = password);
  }

  save() {
    db.execute(`
      INSERT INTO people(
        first_name,
        last_name,
        email,
        password
      )
      VALUES(
        '${this.first_name}',
        '${this.last_name}',
        '${this.email}',
        '${this.password}'
        )
    `);
  }
}

module.exports = UserModel;
