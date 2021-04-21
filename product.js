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
};

const Product = mongoose.model("Product", productSchema);

const coat = new Product({ name: "Peacoat", price: 149.95 });
coat
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
