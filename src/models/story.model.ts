import { StoryKidsModel } from './story-kids.model';
import { StoryEntity } from "../entities/story.entity";

export class StoryModel {
    id: number;
    by: string;
    score: number;
    title: string;
    type: string;
    url: string;
    kids: [];
    parentId: number;
    descendants: number;
    createdDate: Date;
    updatedDate: Date;

    parentStory: StoryModel;
    kidDetailsList: StoryModel[];

    constructor(json: any) {
        Object.assign(this, json);
    }

    toEntity(): StoryEntity {
        let storyEntity = new StoryEntity();

        storyEntity.id = this.id;
        storyEntity.by = this.by;
        storyEntity.parentId = this.parentId;
        storyEntity.descendants = this.descendants;
        storyEntity.title = this.title;
        storyEntity.score = this.score;
        storyEntity.type = this.type;
        storyEntity.url = this.url;
        storyEntity.descendants = this.descendants;

        if(this.parentStory) {
            storyEntity.parentStory = new StoryEntity();
            storyEntity.parentStory.id = this.parentStory.id;
            storyEntity.parentStory.by = this.parentStory.by;
            storyEntity.parentStory.parentId = this.parentStory.parentId;
            storyEntity.parentStory.descendants = this.parentStory.descendants;
            storyEntity.parentStory.title = this.parentStory.title;
            storyEntity.parentStory.score = this.parentStory.score;
            storyEntity.parentStory.type = this.parentStory.type;
            storyEntity.parentStory.url = this.parentStory.url;
            storyEntity.parentStory.descendants = this.descendants;
        }

        return storyEntity;
    }
}
