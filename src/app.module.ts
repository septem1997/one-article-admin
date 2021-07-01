import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article';
import { ArticleDate } from './entity/articleDate';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Comment } from './entity/comment';
import { User } from './entity/user';
const jwtService = JwtModule.register({
  secret: 'secretForUser'
});
@Module({
  imports: [
    PassportModule,
    jwtService,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'one-article',
      entities: [__dirname + '/entity/*{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article,ArticleDate,Comment,User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
