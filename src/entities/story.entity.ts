import {
    Entity,
    PrimaryColumn,
    Column,
    Tree,
    TreeParent,
    TreeChildren,
    BaseEntity, PrimaryGeneratedColumn
} from "typeorm";

@Entity('StoreEntity')
@Tree("closure-table")
export class StoryEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, default: null})
    by: string;

    @Column({nullable: true, default: null})
    descendants: number;

    @Column({nullable: true, default: null})
    parentId: number;

    @Column({nullable: true, default: null})
    score: number;

    @Column({
        length: 255,nullable: true, default: null
    })
    title: string;

    @Column({
        length: 64
    })
    type: string;

    @Column({
        length: 255,
        nullable: true,
        default: null
    })
    url: string;

    @Column({ name: 'created_date', type: 'datetime', nullable: true, default: null})
    createdDate: Date;

    @Column({ name: 'updated_date', type: 'datetime', nullable: true, default: null})
    updatedDate: Date;

    @TreeParent()
    parentStory: StoryEntity;

    @TreeChildren({cascade: true})
    childrenStory: StoryEntity[];
}
