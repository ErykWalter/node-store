import { Sequelize, DataTypes, Model, CreationOptional,InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize'
import sequelize from './Connection'

// Define the Item model for the "items" table
// it has two columns: id and name

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> implements Item {
    declare public id: CreationOptional<number>;
    declare public name: string;
    declare public quantity: number;
}

Item.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize
})

Item.sync()

export default Item;
