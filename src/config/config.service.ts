import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as path from 'path';

import {
  DB_DATABASE_KEY,
  DB_HOST_KEY,
  DB_PASSWORD_KEY,
  DB_PORT_KEY,
  DB_USERNAME_KEY,
  ENV_FILE_NAME,
} from '../constants';

interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig = {};

  constructor() {
    const filePath = path.join(appRoot.path, ENV_FILE_NAME);
    // checks file
    const exists = fs.existsSync(filePath);

    if (!exists) {
      return;
    }

    const env = fs.readFileSync(filePath);
    const conf = dotenv.parse(env);
    this.envConfig = conf;
  }

  getConfig(key: string, defaultValue?: string): string {
    return process.env[key] || this.envConfig[key] || defaultValue;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const portString = this.getConfig(DB_PORT_KEY, '5432');
    const entityPath = path.join('**', '*.entity.js');
    const migrationFolderPath = 'migrations';
    const migrationsPath = path.join('src', migrationFolderPath, '*.js');

    return {
      type: 'postgres',
      host: this.getConfig(DB_HOST_KEY),
      port: parseInt(portString, 10),
      username: this.getConfig(DB_USERNAME_KEY),
      password: this.getConfig(DB_PASSWORD_KEY),
      database: this.getConfig(DB_DATABASE_KEY),
      entities: [entityPath],
      migrationsTableName: 'migrations',
      migrations: [migrationsPath],
      ssl: {
        rejectUnauthorized: false,
      },
      cli: {
        migrationsDir: migrationFolderPath,
      },
    };
  }
}
