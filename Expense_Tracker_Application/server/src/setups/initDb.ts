import pool from "./database";

const initDb = async () => {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,    
    email VARCHAR(100) UNIQUE NOT NULL, 
    password TEXT NOT NULL,             
    role VARCHAR(20) DEFAULT 'user',   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      type VARCHAR(20) NOT NULL,
      category VARCHAR(50),
      note TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTablesQuery);
    console.log("🚀 Database tables initialized");
  } catch (err) {
    console.error("❌ Error initializing tables:", err);
  }
};

export default initDb;
