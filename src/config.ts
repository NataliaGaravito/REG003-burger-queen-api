import dotenv from 'dotenv';
dotenv.config();

export const port = process.argv[2] || process.env.PORT || 3000;
export const dbUrl = process.env.DB_URL || 'postgres://bq:secret@localhost:5432/bqTypescript';
export const secret = process.env.JWT_SECRET || 'secret-token';
export const adminEmail = process.env.ADMIN_EMAIL || 'mavalzea@mail.com';
// export const adminEmail = process.env.ADMIN_EMAIL || 'postgres@postgres.com';
export const adminPassword = process.env.ADMIN_PASSWORD || 'secretpassword2';