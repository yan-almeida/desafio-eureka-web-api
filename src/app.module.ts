import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { join } from 'path';
import { ormConfig } from './configs/orm.config';
import { EnderecoModule } from './modules/endereco/endereco.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(ormConfig),
    EnderecoModule,
    ServicesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
