const express = require('express');
const mongoose = require('mongoose');

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối:', err));

app.get('/', (req, res) => {
  res.send('<h1>Node.js + MongoDB API đang chạy!</h1>');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});