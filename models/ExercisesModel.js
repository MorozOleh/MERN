const db = require('../db/mySQLconnection');

class ExercisesModel {
  static findAll() {
    return db.execute(`
        SELECT *
        FROM done_exercises;
      `);
  }

  static findByDateAndId(time, id) {
    return db.execute(`
        SELECT 
          people.first_name,
          people.last_name,
          done_exercises.person_id
        FROM done_exercises
        JOIN people
          ON done_exercises.person_id = people.id
        WHERE
          done_exercises.created_at = '${time}'
          AND done_exercises.person_id = ${id}
      `);
  }

  constructor(id) {
    this.id = id;
  }

  save() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const created_at = year + '-' + month + '-' + day;

    db.execute(`
    INSERT INTO done_exercises(
      created_at,
      person_id
    )
    VALUES("${created_at}", ${this.id})`);
  }
}

module.exports = ExercisesModel;
