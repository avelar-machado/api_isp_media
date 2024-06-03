// models/artista.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const Artista = sequelize.define('artista', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Artista;
