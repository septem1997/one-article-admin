import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Article } from './article';


@Entity()
export class ArticleDate extends BaseEntity{

    @Column({type:'date'})
    date: string;

    @ManyToOne(type => Article, article => article.dates)
    article: Article;

}
