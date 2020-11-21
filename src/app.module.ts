import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article';
import { ArticleDate } from './entity/articleDate';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root123456',
      database: 'one-article',
      entities: [__dirname + '/entity/*{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article,ArticleDate]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
