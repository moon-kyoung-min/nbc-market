// index.js

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 상품 목록 데이터 (가정)
let products = [];

// 1. 상품 작성 API
app.post('/products', (req, res) => {
  const { productName, description, authorName, password } = req.body;
  const product = {
    productName,
    description,
    authorName,
    status: 'FOR_SALE',
    createdAt: new Date(),
    password,
  };
  products.push(product);
  res.json({ message: '상품이 등록되었습니다.' });
});

// 2. 상품 목록 조회 API
app.get('/products', (req, res) => {
  const sortedProducts = products.sort((a, b) => b.createdAt - a.createdAt);
  res.json(sortedProducts);
});

// 3. 상품 상세 조회 API
app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
  }

  res.json(product);
});

// 4. 상품 정보 수정 API
app.put('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const { productName, description, status, password } = req.body;
  const productIndex = products.findIndex((p) => p.productId === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
  }

  const existingProduct = products[productIndex];

  if (existingProduct.password !== password) {
    return res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  existingProduct.productName = productName;
  existingProduct.description = description;
  existingProduct.status = status;

  res.json({ message: '상품이 수정되었습니다.' });
});

// 5. 상품 삭제 API
app.delete('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const { password } = req.body;
  const productIndex = products.findIndex((p) => p.productId === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
  }

  const existingProduct = products[productIndgitex];

  if (existingProduct.password !== password) {
    return res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
  }

  products.splice(productIndex, 1);

  res.json({ message: '상품이 삭제되었습니다.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
