import Product from '../models/ProductModel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ?{
      // if the keyword does have ,then create query object 
      // using the MOngoDB  $regex to find any product that contains the keyword 
      // The '$options: 'i'` makes it case-insensitive.
      name : {
        $regex : req.query.keyword,
        $options : "i", // by using this we make it case insensitive 
      },
    }:{};  // otherwise the query object will empty 
    const products = await Product.find({...keyword});
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


export default { getProducts, getProductById };
