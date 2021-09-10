import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { BaseEntity } from './baseEntity';
import { ArticleDate } from './articleDate';


@Entity()
export class Article extends BaseEntity{

    @Column()
    title: string;

    @Column()
    author:string;

    @Column({type:'text'})
    digest:string;

    @Column({type:'mediumtext'})
    content:string;


    @OneToMany(type => ArticleDate,date => date.article)
    dates:ArticleDate[]

}
