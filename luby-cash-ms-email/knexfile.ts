import path from 'path';

module.exports = {
  client: 'mysql',
  connection: {
    // filename: path.resolve(__dirname, 'src', 'database', 'connection.ts'),
     user: 'root', database: 'ms_lubycash' 
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
};
