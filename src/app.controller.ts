import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entity/user';
import { Comment } from './entity/comment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('today')
  async getTodayArticle() {
    return await this.appService.getToday()
  }

  @Get('random')
  async getRandomArticle() {
    return await this.appService.getRandom()
  }

  @Get('date/:date')
  async getArticleByDate(@Param('date') date:string) {
    return await this.appService.getByDate(date)
  }

  @Post('login')
  login(@Body() userDto: User) {
    if (userDto.username && userDto.password) {
      return this.appService.login(userDto)
    } else {
      throw new HttpException('请输入用户名和密码', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('comments')
  async getComments(
    @Query("articleId") articleId: number
  ):Promise<Comment[]> {
    return await this.appService.findCommentsByArticle(articleId);
  }

  @Post('signup')
  signUp(@Body() userDto: User) {
    return this.appService.create(userDto)
  }
}
