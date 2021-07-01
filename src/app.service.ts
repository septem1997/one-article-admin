import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import Axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article';
import { Repository } from 'typeorm';
import { ArticleDate } from './entity/articleDate';
import { User } from './entity/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { Comment } from './entity/comment';



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
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly jwtService: JwtService,
  ) {
  }


  register(pass: string):Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(pass, saltRounds);
  }

  async login(userDto:User) {
    const findUser = await this.findOne(userDto)
    if (findUser){
      const pwdIsCorrect = await bcrypt.compare(userDto.password, findUser.password)
      if (pwdIsCorrect){
        userDto.password = null
        return {
          token:'Bearer '+this.jwtService.sign(userDto),
          username:findUser.username,
        }
      }else {
        throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
      }
    }else {
      throw new HttpException('找不到该用户', HttpStatus.NOT_FOUND);
    }
  }

  async create(userDto: User) {
    const query  = new User()
    query.username = userDto.username
    const findAdmin = await this.userRepository.findOne(query)
    if (findAdmin){
      throw new HttpException('该用户名已存在', HttpStatus.CONFLICT);
    }
    const user = new User()
    const newPass = await this.register(userDto.password)
    user.username = userDto.username
    user.password = newPass
    await this.userRepository.save(user)
    userDto.password = null
    return {
      token:'Bearer '+this.jwtService.sign(userDto),
      username:user.username
    }
  }

  async findOne(userDto: User):Promise<User> {
    const query = new User()
    query.username = userDto.username
    return await this.userRepository.findOne(query)
  }

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


  createComment(user:User,comment:Comment){
    const barrage = new Comment();
    const article = new Article();
    article.id = comment.articleId
    if (comment.creator.id)
    barrage.article = article
    barrage.creator = user
    barrage.content = comment.content
    this.commentRepository.save(barrage)
  }

  async findCommentsByArticle(articleId:number): Promise<Comment[]> {
    const list =  await this.commentRepository.createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.content',
        'creator.username',
        'comment.createTime',
        'comment.address'
      ])
      .leftJoin('barrage.creator', 'creator')
      .leftJoin('barrage.article', 'article')
      .where('article.id = :id', { id: articleId })
      .getMany();
    list.forEach((comment)=>{
      comment.username = comment.creator?comment.creator.username:'匿名用户'
    })
    return list
  }
}
