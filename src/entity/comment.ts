import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { ArticleDate } from './articleDate';
import { User } from './user';
import { Article } from './article';


@Entity()
export class Comment extends BaseEntity{

    @Column()
    content: string;

    @Column()
    address:string;


    @ManyToOne(() => User,{
        nullable:true
    })
    creator: User;


    @ManyToOne(() => Article)
    article: Article;

    articleId:number

    username:string;
}
