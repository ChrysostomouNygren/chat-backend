const db = require("../database");

async function getRooms() {
  const sql = "SELECT * FROM rooms";
  const result = await db.query(sql)
  return result.rows

  // return db.query(sql, function (error, rows) {
  //   if (error) {
  //     console.error(error.message);
  //   }
  //   return rows;
  // });

  // return new Promise((resolve, reject) => {
  //   db.all(sql, (error, rows) => {
  //     if (error) {
  //       console.error(error.message);
  //       reject(error);
  //     }
  //     resolve(rows);
  //   });
  // });
}

function addRoom(room) {
  const sql = "INSERT INTO rooms (name) VALUES ($1)";

  return db.query(sql, [room], function (error) {
    if (error) {
      console.error(error.message);
    }
    return;
  });
  // return new Promise((resolve, reject) => {
  //   db.run(sql, [room], (err) => {
  //     if (err) {
  //       console.error(err.message);
  //       reject(err);
  //     }
  //     resolve();
  //   });
  // });
}

function deleteRoom(id) {
  const sql = "DELETE FROM rooms WHERE id = $1";

  return db.query(sql, [id], function (error) {
    if (error) {
      console.error(error.message);
    }
    return;
  });
  // return new Promise((resolve, reject) => {
  //   db.get(sql, id, (error) => {
  //     if (error) {
  //       console.error(error.message);
  //       reject(error);
  //     }
  //     resolve();
  //   });
  // });
}

module.exports = {
  getRooms,
  addRoom,
  deleteRoom,
};
