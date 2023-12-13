import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config();

class Connection {
    private static _instance: Connection;
    private _sequelize: Sequelize.Sequelize;
    private constructor() {
        this._sequelize = new Sequelize.Sequelize(
        process.env.POSTGRES_DB || 'postgres',
        process.env.POSTGRES_USER || 'postgres',
        process.env.POSTGRES_PASSWORD || 'postgres',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
        },
        );
    }
    public static get Instance() {
        if (this._instance == null) {
            this._instance = new Connection();
        }
        return this._instance;
    }
    get sequelize() {
        return this._sequelize;
    }
}

const sequelize = Connection.Instance.sequelize;
export default sequelize;
