// create a model for storing sessions in the database
// it has only one column: sid

import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey } from 'sequelize'
import sequelize from './Connection'

class Session extends Model<InferAttributes<Session>, InferCreationAttributes<Session>> implements Session {
    declare public sid: string;
}

Session.init({
    sid: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: 'session',
})

export default Session;
