const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/productApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("Connection Open"))
  .catch((err) => console.log(err));

const productSchema = {
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
};

const Product = mongoose.model("Product", productSchema);

productSchema.methods.addOnSale = function () {
  this.onSale = !this.onSale;
  this.price = this.price * 0.8;
  return this.save();
};

const saleItem = async (productName) => {
  try {
    const product = Product.findOne({ name: productName });
    console.log(product);
    await product.addOnSale();
    console.log(product);
  } catch (e) {
    console.log(e);
  }
};

saleItem("Black T-shirt");

// const blackTShirt = new Product({
//   name: "Black T-shirt",
//   price: 6.99,
//   qty: 5,
//   categories: ["upperwear"],
//   size: "l",
// });
// blackTShirt.save();
