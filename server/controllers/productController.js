import Product from '../models/ProductModel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      // if the keyword does have ,then create query object 
      // using the MOngoDB  $regex to find any product that contains the keyword 
      // The '$options: 'i'` makes it case-insensitive.
      name: {
        $regex: req.query.keyword,
        $options: "i", // by using this we make it case insensitive 
      },
    } : {};  // otherwise the query object will empty 
    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// here we write the function to create the product 
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, brand, category, countInStock, description } = req.body;

    // Validation
    if (!name || !price || !category || !brand || description === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const product = new Product({
      name,
      price,
      user: req.user._id,
      image: image || 'https://placehold.co/600x400',
      brand,
      category,
      countInStock: countInStock || 0,
      numReviews: 0,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

export default { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview };
