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
};

const Product = mongoose.model("Product", productSchema);

const blackTShirt = new Product({
  name: "Black T-shirt",
  price: 6.99,
  qty: 5,
  categories: ["upperwear"],
  size: "l",
});
blackTShirt.save();
