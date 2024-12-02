export type Product = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

export type AddProduct = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
