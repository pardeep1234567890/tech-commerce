import { Link } from 'react-router-dom';

// We just pass { product } directly as a prop
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-black">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{product.category}</p>
        </div>
        <p className="text-sm font-medium text-black">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;