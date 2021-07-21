import { AbstractService } from './abstract.service';
import { GET_STORY_DETAILS_URL, GET_TOP_STORIES_URL, HACKER_NEWS_URL } from '../config/constants';
import { StoryModel } from '../models/story.model';
import { getConnection, getManager } from 'typeorm';
import { StoryEntity } from '../entities/story.entity';

class StoryService extends AbstractService {
    public constructor() {
        super();
    }

    async getTopStories(param: {}, limit: number) {
        try {
            console.log(`Service => get top stories... limit: ${limit}`);
            let stories = await super.get(HACKER_NEWS_URL.concat(GET_TOP_STORIES_URL));

            if (stories instanceof Error) {
                throw stories;
            }

            stories = JSON.parse(stories.toString())
            if (limit && stories.length > limit) {
                stories = stories.slice(0, limit);
            }

            console.log(`Stories: ${stories}`);
            return stories;
        } catch (e) {
            throw Error('Error in getting top stories');
        }
    }

    async getStoryDetails(param: {}, id: number): Promise<StoryModel> {
        try {
            console.log(`Service => get story details w/ id: ${id}`);
            let url = GET_STORY_DETAILS_URL;
            url = url.replace(/%1/i, id.toString());
            //console.log(url.replace(/%1/i, id.toString()));
            let result = await super.get(HACKER_NEWS_URL.concat(url));
            if (result instanceof Error) {
                throw result;
            }
            let story: StoryModel = JSON.parse(result.toString());
            //console.log(`Story: ${story}`);
            console.log(story);
            return story;
        } catch (e) {
            throw Error('Error in getting top stories');
        }
    }

    async getChildDetails(children: StoryModel[], parent: StoryModel, id: number): Promise<StoryModel[]> {
        try {
            console.log(`Service => get child details w/ id: ${id}`);
            let child: StoryModel = new StoryModel(await this.getStoryDetails({}, id));
            child.parentStory = parent;
            children.push(child);
            if (child.kids && child.kids.length > 0) {
                child.kidDetailsList = new Array(child.kids.length);
                for (let ctr = 0; ctr < child.kids.length; ctr++) {
                    await this.getChildDetails(child.kidDetailsList, child, child.kids[ctr]);
                }
            }
            return children;
        } catch (e) {
            throw Error('Error in getting top stories');
        }
    }

    async saveStories(story: StoryModel, children: StoryModel[]) {
        try {
            const manager = getManager();
            //const connection = getConnection();
            //const storyEntityRepository = connection.getRepository(StoryEntity);
            if (!story.parentStory) {
                let storyEntity = story.toEntity();
                console.log('Saving:', storyEntity);
                //await storyEntityRepository.save(storyEntity);
                //await StoryEntity.save(storyEntity);
                await manager.save(storyEntity);
            }

            if (children) {
                let childrenEntity: StoryEntity[] = [];
                children.forEach((i: StoryModel) => {
                    let storyEntity = i.toEntity();
                    childrenEntity.push(storyEntity);
                });
                console.log('Saving:', childrenEntity);
                //await StoryEntity.save(childrenEntity);
                //await storyEntityRepository.save(childrenEntity);
                await manager.save(childrenEntity);

                children.forEach((i: StoryModel) => {
                    if (i.kidDetailsList) {
                        this.saveStories(i, i.kidDetailsList);
                    }
                });
            }
            return story;
        } catch (e) {
            throw Error('Error in getting top stories');
        }
    }
}

export default new StoryService();

