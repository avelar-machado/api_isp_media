// imports
// servidores
import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';

// local database
import * as database from './config/dbConfig.js'

// importar as models para que sejam actualizadas com o sequelize
import User from './models/user.js'
import Album from './models/album.js'
import Artista from './models/artista.js'
import Genero from './models/genero.js'
import Image from './models/image.js'
import Music from './models/music.js'
import Video from './models/video.js'
import Critica from './models/critica.js'
import Playlist from './models/playlist.js';

// importar as rotas para que sejam registadas
import userRoutes from "./routes/userRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import artistaRoutes from "./routes/artistaRoutes.js";
import generoRoutes from "./routes/generoRoutes.js";
import imageRoutes from './routes/imageRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import musicRoutes from './routes/musicRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import criticaRoutes from './routes/criticaRoutes.js'
import playlistRoutes from './routes/playlistRoutes.js';

// Inicio das operacoes
const server = fastify();

// Registra as rotas criadas
server.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST','PUT', 'DELETE']
});
server.register(fastifyMultipart);
server.register(userRoutes);
server.register(albumRoutes);
server.register(artistaRoutes);
server.register(generoRoutes);
server.register(imageRoutes);
server.register(videoRoutes);
server.register(musicRoutes);
server.register(playlistRoutes);
server.register(uploadRoutes);
server.register(criticaRoutes);


// Inicia o servidor
const start = async () => {
    try {
        // database conexao
        await database.sequelize.sync({force:true});
        //await database.sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // porta de uso
        await server.listen({
            host: '0.0.0.0',
            port: 3000
        });

    } catch (err) {
        process.exit(1);
    }
};

start();