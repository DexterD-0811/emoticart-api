import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { Order } from './model.js';

dotenv.config();

mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not found in .env');
  process.exit(1);
}

const users = [
  "690b84f859d9f3c79983c93f",
  "690b84fb59d9f3c79983c942",
  "690b84fc59d9f3c79983c945",
  "690b84ff59d9f3c79983c948",
  "690b850459d9f3c79983c951",
  "690b850559d9f3c79983c954",
  "690b850259d9f3c79983c94e",
  "690b850759d9f3c79983c957",
  "690b850159d9f3c79983c94b",
  "690b850859d9f3c79983c95a"
];

const products = [
  { _id: "6900ff79a8d4acbe4dff0292", name: "Fresh Chicken", price: 16, icon: "🍗" },
  { _id: "6900ff7aa8d4acbe4dff0294", name: "Fresh Chicken Breast", price: 12.99, icon: "🍗" },
  { _id: "6900ff7ba8d4acbe4dff0296", name: "Grass-fed Beef Steak", price: 24.99, icon: "🥩" },
  { _id: "6900ff82a8d4acbe4dff029c", name: "Lamb Chops", price: 22.5, icon: "🍖" },
  { _id: "6900ff7da8d4acbe4dff0298", name: "Pork Sausages", price: 8.99, icon: "🌭" },
  { _id: "6900ff7fa8d4acbe4dff029a", name: "Turkey Drumsticks", price: 15.49, icon: "🍖" }
];

function randomDateInLastSixMonths() {
  const now = new Date();
  const past = new Date();
  past.setMonth(past.getMonth() - 6);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

function randomUniqueProducts() {
  const numItems = faker.number.int({ min: 1, max: 5 });
  const shuffled = faker.helpers.shuffle(products);
  return shuffled.slice(0, numItems);
}

async function seedOrders() {
  try {
    await mongoose.connect(MONGO_URI);

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const orders = Array.from({ length: 100 }, () => {
      const createdAt = randomDateInLastSixMonths();
      const updatedAt = new Date(createdAt.getTime() + Math.random() * 10 * 24 * 60 * 60 * 1000);
      const status = faker.helpers.arrayElement(statusOptions);
      const userId = faker.helpers.arrayElement(users);

      const selectedProducts = randomUniqueProducts();

      const orderItems = selectedProducts.map((product) => {
        const quantity = faker.number.int({ min: 1, max: 5 });
        return {
          product: new mongoose.Types.ObjectId(product._id),
          name: product.name,
          quantity,
          price: product.price,
          icon: product.icon
        };
      });

      const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        user: userId,
        orderItems,
        shippingAddress: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
        },
        totalPrice,
        status,
        paidAt: status !== 'Pending' ? faker.date.between({ from: createdAt, to: updatedAt }) : null,
        deliveredAt: status === 'Delivered' ? faker.date.between({ from: createdAt, to: updatedAt }) : null,
        createdAt,
        updatedAt,
      };
    });

    await Order.insertMany(orders);
    console.log('100 orders inserted');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedOrders();
