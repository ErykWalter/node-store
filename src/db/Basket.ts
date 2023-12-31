// model for storing items in the basket for each session
// it has three columns: id, sessionId, itemId
// sessionId is a foreign key referencing the sessions table
// itemId is a foreign key referencing the items table

import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from 'sequelize'
import sequelize from './Connection'
import Session from './Session'
import Item from './Item'

// Define the Basket model for the "basket" table
class Basket extends Model<InferAttributes<Basket>, InferCreationAttributes<Basket>> implements Basket {
    declare public id: CreationOptional<number>;
    declare public sessionId: ForeignKey<Session['sid']>;
    declare public itemId: ForeignKey<Item['id']>;
}

Basket.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sessionId: {
        type: DataTypes.STRING,
        references: {
            model: Session,
            key: 'sid',
        },
    },
    itemId: {
        type: DataTypes.INTEGER,
        references: {
            model: Item,
            key: 'id',
        },
    },
}, {
    sequelize,
})

Basket.belongsTo(Session, { foreignKey: 'sessionId' });
Basket.belongsTo(Item, { foreignKey: 'itemId' });

export default Basket;
