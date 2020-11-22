import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

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
}
