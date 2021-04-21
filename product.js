const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/productApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("Connection Open"))
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  },
  categories: {
    type: [String],
    default: "clothing",
    lowercase: true,
  },
  size: {
    type: String,
    required: true,
    uppercase: true,
    enum: ["XS", "S", "M", "L", "XL"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
});

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 3.99 });
};

productSchema.methods.addSale = function () {
  this.onSale = true;
  this.price = this.price * 0.8;
  return this.save();
};

productSchema.methods.removeSale = function () {
  this.onSale = false;
  this.price = this.price * 1.2;
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

const putOnSale = async (name) => {
  const product = await Product.findOne({ name: name });
  console.log(product);
  await product.addSale();
  console.log(product);
};

const takeOffSale = async (name) => {
  const product = await Product.findOne({ name: name });
  console.log(product);
  await product.removeSale();
  console.log(product);
};

Product.fireSale().then((res) => console.log(res));

// Product.insertMany([
//   {
//     name: "Black T-shirt",
//     price: 6.99,
//     qty: 10,
//     categories: ["clothing", "short-sleeves"],
//     size: "S",
//     onSale: false,
//   },
//   {
//     name: "Red T-shirt",
//     price: 5.99,
//     qty: 6,
//     categories: ["clothing", "short-sleeves"],
//     size: "m",
//     onSale: false,
//   },
//   {
//     name: "Brown Peacoat",
//     price: 159.5,
//     qty: 2,
//     categories: ["clothing", "outerwear"],
//     size: "L",
//     onSale: false,
//   },
//   {
//     name: "Denim Pants",
//     price: 39.95,
//     qty: 8,
//     categories: ["clothing", "lowerwear"],
//     size: "M",
//     onSale: false,
//   },
// ]);

// const saleItem = async (productName) => {
//   try {
//     const product = Product.findOne({ name: productName });
//     console.log(product);
//     await product.addOnSale();
//     console.log(product);
//   } catch (e) {
//     console.log(e);
//   }
// };
