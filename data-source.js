"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
  host: "postgresql-198815-0.cloudclusters.net", //process.env.DATABASE_HOST || 'localhost',
  port: 19991, //parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: "yahweh", //process.env.DATABASE_USER ,
  password: "ada35111ff", //process.env.DATABASE_PASSWORD || 'ada35111ff',
  database: "yahweh", //process.env.DATABASE_NAME || 'yahweh-game',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['./src' + '/migrations/*{.ts,.js}'],
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