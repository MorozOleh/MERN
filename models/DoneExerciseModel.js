const db = require('../db/mySQLconnection');

class DoneExerciseModel {
  static findByPersonId(time, id) {
    return db.execute(`
      SELECT inv.name, done.quantity
      FROM done_exercises done
      JOIN inventories inv
        ON done.inventory_id = inv.id
      WHERE
        done.person_id = ${id} AND done.created_at = '${time}'
    `);
  }
  static findById(id) {
    return db.execute(`
        SELECT *
        FROM done_exercises
        WHERE id = ${id};
      `);
  }

  constructor({ person_id, inventory_id, quantity }) {
    (this.person_id = person_id),
      (this.inventory_id = inventory_id),
      (this.quantity = quantity);
  }

  save() {
    const date = new Date();
    const year = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    const created_at = `${year}-${mm}-${dd}`;

    return db.execute(`
        INSERT INTO done_exercises(
          created_at,
          person_id,
          inventory_id,
          quantity
        )
        VALUES('${created_at}', '${this.person_id}', '${this.inventory_id}', '${this.quantity}')
      `);
  }
}

module.exports = DoneExerciseModel;
