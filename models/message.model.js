const db = require("../database");

function getMessagesFromRoom(roomName) {
  const sql = "SELECT * FROM message WHERE room = $1";

  return db.query(sql, [roomName], function (error, rows) {
    if (error) {
      console.error(error.message);
    }
    return rows;
  });
  // return new Promise((resolve, reject) => {
  //   db.all(sql, roomName, (error, rows) => {
  //     if (error) {
  //       console.error(error.message);
  //       reject(error);
  //     }
  //     resolve(rows);
  //   });
  // });
}

function addMessage(message, room, user, date) {
  const sql =
    "INSERT INTO message (value, room, user, date) VALUES ($1, $2, $3, $4)";

  return db.query(sql, [message, room, user, date], function (error, mess) {
    if (error) {
      console.error(error.message);
    }
    return mess;
  });
  // return new Promise((resolve, reject) => {
  //   db.run(sql, [message, room, user, date], (err) => {
  //     if (err) {
  //       console.error(err.message);
  //       reject(err);
  //     }
  //     console.log(message, room, user, date);
  //     resolve();
  //   });
  // });
}

function deleteMessages(room) {
  const sql = "DELETE FROM message WHERE room = $1";

  return db.query(sql, [room], function (error, del) {
    if (error) {
      console.error(error.message);
    }
    return del;
  });
  // return new Promise((resolve, reject) => {
  //   db.get(sql, room, (error) => {
  //     if (error) {
  //       console.error(error.message);
  //       reject(error);
  //     }
  //     resolve();
  //   });
  // });
}

module.exports = {
  addMessage,
  getMessagesFromRoom,
  deleteMessages,
};