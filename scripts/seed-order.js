import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

import { Order } from '../src/orders/model.js';
import { User } from '../src/users/model.js';
import { Product } from '../src/products/model.js';

dotenv.config();

mongoose.set('strictQuery', false);

function getRandomDateBetween(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function seedOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const users = await User.find({ role: 'customer' }).lean();
    const products = await Product.find({ isActive: true }).lean();

    if (!users.length || !products.length) {
      console.error('No users or products found to seed orders.');
      await mongoose.disconnect();
      process.exit(1);
    }

    const orders = [];

    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());

    for (let i = 0; i < 50; i++) {
      const user = faker.helpers.arrayElement(users);

      const orderItemsCount = faker.number.int({ min: 1, max: 5 });
      let totalPrice = 0;
      const orderItems = [];

      for (let j = 0; j < orderItemsCount; j++) {
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 5 });
        totalPrice += product.price * quantity;

        orderItems.push({
          product: product._id,
          name: product.name,
          quantity,
          price: product.price,
          icon: product.icon,
        });
      }

      const createdAt = getRandomDateBetween(threeMonthsAgo, now);

      // For paidAt and deliveredAt, generate random dates after createdAt (or null)
      const paidAt = faker.datatype.boolean() ? getRandomDateBetween(createdAt, now) : null;
      const deliveredAt = paidAt && faker.datatype.boolean() ? getRandomDateBetween(paidAt, now) : null;

      orders.push({
        user: user._id,
        orderItems,
        shippingAddress: {
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
        },
        totalPrice: Number(totalPrice.toFixed(2)),
        status: faker.helpers.arrayElement(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
        paidAt,
        deliveredAt,
        createdAt,
        updatedAt: createdAt,
      });
    }

    await Order.insertMany(orders);
    console.log('Inserted 50 mock orders.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedOrders();
