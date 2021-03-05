import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article';
import { Repository } from 'typeorm';
import { ArticleDate } from './entity/articleDate';

const moment = require('moment');


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

  // @Cron(CronExpression.EVERY_MINUTE)
  // async fetchPage() {
  //   const res = await Axios.get('https://interface.meiriyiwen.com/article/random');
  //   const article = new Article();
  //   Object.assign(article, res.data.data);
  //   const query = new Article();
  //   query.title = article.title;
  //   query.author = article.author;
  //   const count = await this.articleRepository.count(query);
  //   if (count > 0) {
  //     // console.log('文章已存在:',article.title)
  //     return;
  //   }
  //   // else {
  //   //   console.log('下载文章:', article.title, res.data.data.date.curr);
  //   // }
  //   await this.articleRepository.save(article);
  // }

  async getToday() {
    return await this.getByDate(moment().format('YYYY-MM-DD'))
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

  async getRandom() {
    const total = await this.articleRepository.count()
    const id = this.getRandomInt(0, total)
    return await this.articleRepository.findOne(id)
  }

  async getByDate(date: string) {
    if (!new RegExp(/^\d{4}([-\/.])\d{2}\1\d{2}$/).test(date) || !moment(date).isValid()) {
      throw new HttpException('请选择正确的日期', HttpStatus.BAD_REQUEST);
    }
    if (moment(date).isAfter(moment().format('YYYY-MM-DD'))){
      throw new HttpException('该日期还没有文章', HttpStatus.BAD_REQUEST);
    }
    const findOne = await this.articleDateRepository.createQueryBuilder('date')
      .leftJoinAndSelect('date.article', 'article')
      .select([ 'article.title as title','article.author as author', 'article.digest as digest',
        'article.content as content'])
      .where('date = :date', { date: date })
      .getRawOne()
    if (findOne){
      return findOne
    }else {
      const articleDate = new ArticleDate();
      articleDate.article  = await this.getRandom()
      articleDate.date = date
      await this.articleDateRepository.save(articleDate)
      return articleDate.article
    }
  }
}
