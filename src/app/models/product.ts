export class Product {
  id?: number;
  name: string;
  qty: number;
  price: number;
  description: string;
  image: any;

  constructor(
    name: string,
    qty: number,
    price: number,
    description: string,
    image: any
  ) {
    this.name = name;
    this.qty = qty;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
