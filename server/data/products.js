// We'll add user later. For now, you can manually get a user's ObjectId
// from your MongoDB database after you create one.
// For the seeder, 'user' isn't strictly necessary yet, but it's good practice.
// Let's assume a placeholder 'user' ID for now.
const products = [
  {
    name: 'Aura "Void" Hoodie',
    image: 'https://images.unsplash.com/photo-1556811996-80f4f7f60512?w=500',
    description:
      'A heavyweight, oversized hoodie in jet black. Made from 100% premium cotton with a minimalist logo embroidery. The "Void" is your new uniform.',
    brand: 'Aura Apparel',
    category: 'Hoodies',
    price: 120.00,
    countInStock: 50,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Aura "Essential" T-Shirt',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    description:
      'The perfect oversized t-shirt in a washed black finish. Features a relaxed fit, drop shoulders, and a durable rib-knit collar. The ultimate "essential" piece.',
    brand: 'Aura Apparel',
    category: 'T-Shirts',
    price: 45.00,
    countInStock: 100,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Aura "Orbit" Crewneck',
    image: 'https://images.unsplash.com/photo-1620799139507-2a42f51199c2?w=500',
    description:
      'A clean, off-white crewneck sweatshirt. Its boxy fit and subtle "Aura" text on the cuff make it a versatile piece for any look.',
    brand: 'Aura Apparel',
    category: 'Sweatshirts',
    price: 85.00,
    countInStock: 30,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Aura "Foundation" Cargo',
    image: 'https://images.unsplash.com/photo-1603236820521-a50e13b8364c?w=500',
    description:
      'A modern take on the classic cargo pant. Tapered fit, built from durable ripstop fabric, and features six functional pockets. Finished in a matte olive green.',
    brand: 'Aura Apparel',
    category: 'Pants',
    price: 110.00,
    countInStock: 25,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Aura "Stratus" Sneaker',
    image: 'https://images.unsplash.com/photo-1600269452246-d2c692d1f04f?w=500',
    description:
      'A minimalist "cloud" sneaker with a chunky, yet lightweight sole. Features a monochrome white-on-white design with premium leather and suede panels.',
    brand: 'Aura Apparel',
    category: 'Footwear',
    price: 160.00,
    countInStock: 15,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Aura "Signal" Beanie',
    image: 'https://images.unsplash.com/photo-1576878342621-fef056e3001b?w=500',
    description:
      'A classic fisherman beanie in a high-visibility "Signal" orange. The perfect accent piece to an all-black outfit. 100% ribbed cotton.',
    brand: 'Aura Apparel',
    category: 'Accessories',
    price: 35.00,
    countInStock: 75,
    rating: 0,
    numReviews: 0,
  },
];

export default products;