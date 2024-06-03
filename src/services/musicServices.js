// src/services/musicServices.js
import Music from '../models/music.js'
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import Genero from '../models/genero.js';

// criação de um novo registo de música
export async function createMusic(musicData) {
    try {
        const music = await Music.create(musicData);
        return music;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar todas as músicas
export async function getAllMusics() {
    try {
        const musics = await Music.findAll();
        return musics;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar uma música pelo ID
export async function getMusicById(musicID) {
    try {
        const music = await Music.findByPk(musicID);
        if (!music) {
            throw new Error('Music not found');
        }
        return music;
    } catch (error) {
        throw new Error(error.message);
    }
}

// recuperar uma música pelo título
export async function getMusicByTitle(titulo) {
    try {
        const musics = await Music.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${titulo}%`
                }
            }
        });
        return musics;
    } catch (error) {
        throw new Error(error.message);
    }
}

// actualizar as informações de uma música
export async function updateMusic(musicID, musicData) {
    
    // Verificação da existência da música 
    const music = await this.getMusicById(musicID);
    if (!music) {
        throw new Error('Music not found');
    }
    // actualizar as informações da música encontrada
    try {
        const [updatedRows] = await Music.update(musicData, { where: { id: musicID } });
        if (updatedRows === 0) {
            throw new Error('Music not found');
        }
        const updatedMusic = await Music.findByPk(musicID);
        return updatedMusic;
    } catch (error) {
        throw new Error(error.message);
    }
}

// eliminar uma música
export async function deleteMusic(musicID) {
    try {
        const deletedRows = await Music.destroy({ where: { id: musicID } });
        if (deletedRows === 0) {
            throw new Error('Music not found');
        }
        return { message: 'Music deleted successfully' };
    } catch (error) {
        throw new Error(error.message);
    }
}

// procurar uma musica pelo genero musical
export async function getMusicByGenero(genero){
    try{
        const musics = await Music.findAll({
            include: {
                model: Genero,
                where: {nome: genero}
            }
        });
        return musics;
    }catch(error){
        console.error('Erro ao pesquisar as musicas pelo genero');
    }
}

