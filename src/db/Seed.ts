import sequelize from './Connection';
import Item from './Item';

export default async function seed() {
  await sequelize.sync({ force: true });
  await Item.bulkCreate([
    { name: "Coconut", quantity: 10 },
    { name: "Pineapple", quantity: 12 },
    { name: "Mango", quantity: 7 },
    { name: "Banana", quantity: 3 },
    { name: "Apple", quantity: 5 },
    { name: "Orange", quantity: 9 },
    { name: "Pear", quantity: 11 },
    { name: "Peach", quantity: 8 },
    { name: "Plum", quantity: 6 },
    { name: "Cherry", quantity: 4 }
  ]);
}
