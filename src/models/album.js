// models/album.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Artista from './artista.js';

const Album = sequelize.define('album', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Artista,
            key: 'id'
        },
        allowNull: true
    },
});

Album.belongsTo(Artista, { foreignKey: 'artistaId' });

export default Album;
