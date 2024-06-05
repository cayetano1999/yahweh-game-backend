"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'cayetano',
    password: process.env.DATABASE_PASSWORD || 'ada35111ff',
    database: process.env.DATABASE_NAME || 'yahweh-game',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: ['./src/migrations' + '/migrations/*{.ts,.js}'],
    synchronize: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
//# sourceMappingURL=data-source.js.map