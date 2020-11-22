import { Column, PrimaryGeneratedColumn } from 'typeorm';

const moment = require('moment');

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false,select:false, comment: '数据是否可用，用于逻辑删除' })
  disabled: boolean;

  @Column({
    select:false,
    type: 'datetime', default: moment().format('YYYY-MM-DD HH:mm:ss'), transformer: {
      from(value: any): any {
        return moment(value).format('YYYY年MM月DD日 HH:mm:ss');
      },
      to(value: any): any {
        return value;
      },
    },
  })
  createTime: string;

}
