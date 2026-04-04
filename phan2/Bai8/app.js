const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "testdb",
};

// Hàm kết nối DB của bạn
function handleDisconnect() {
  console.log("Đang thử kết nối tới MySQL...");
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Lỗi kết nối (MySQL có thể chưa sẵn sàng):", err.message);
      setTimeout(handleDisconnect, 5000);
    } else {
      console.log("Đã kết nối MySQL thành công!");
    }
  });

  app.get("/", (req, res) => {
    connection.query(
      'SELECT "Kết nối Node.js và MySQL thành công!" AS msg',
      (err, results) => {
        if (err) return res.status(500).send("Lỗi truy vấn: " + err.message);
        res.send(`<h1>${results[0].msg}</h1><p>Bài 8 đã hoàn thành!</p>`);
      },
    );
  });

  connection.on("error", (err) => {
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNREFUSED"
    ) {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.listen(port, "0.0.0.0", () => {
  console.log(
    `Server đang chạy tại http://localhost:8080 (map từ port ${port})`,
  );
});
