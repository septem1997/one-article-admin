import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article';
import { Repository } from 'typeorm';
import { ArticleDate } from './entity/articleDate';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(ArticleDate)
    private articleDateRepository: Repository<ArticleDate>,
  ) {
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async fetchPage() {
    const res = await Axios.get('https://interface.meiriyiwen.com/article/random')
    const article = new Article();
    Object.assign(article,res.data.data)
    console.log('下载文章:',article.title,res.data.data.date.curr)
    const query = new Article()
    query.title = article.title
    query.author = article.author
    const count = await this.articleRepository.count(query)
    if (count>0){
      console.log('文章已存在:',article.title)
      return
    }
    await this.articleRepository.save(article)
  }
}
