import { faker } from '@faker-js/faker';

function getRandomDateWithinLast3Months() {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const from = threeMonthsAgo.toISOString();
  const to = now.toISOString();

  console.log('From:', from);
  console.log('To:', to);

  // Pass ISO strings explicitly to faker.date.between
  return faker.date.between(from, to);
}

try {
  const randomDate = getRandomDateWithinLast3Months();
  console.log('Random date:', randomDate);
} catch (err) {
  console.error('Error in faker.date.between:', err);
}
