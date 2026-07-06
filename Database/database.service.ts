import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sql from 'mssql';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: sql.ConnectionPool;

  async onModuleInit() {
    try {
      this.pool = await sql.connect({
        server: process.env.DB_SERVER,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        options: {
        trustServerCertificate: true,
      },

      });
    } catch (error) {
      console.error('Database Connection Error:', error);
    }
  }

  getPool(): sql.ConnectionPool {
    return this.pool;
  }
}