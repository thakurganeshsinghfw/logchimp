// knexfile.js

module.exports = {
  development: {
    client: 'postgresql', // Or 'mysql2', 'sqlite3', etc. depending on your database
    connection: {
      host: 'localhost', // Database host
      user: 'postgres', // Your database username
      password: '123123', // Your database password
      database: 'postgres', // Your database name
      port: 5433 // Or the correct port for your database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations' // Path to your migrations directory
    },
    seeds: {
      directory: './database/seeds' // Path to your seeds directory (optional)
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL, // Use environment variable for production
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
};
