import { NextFunction, Request, Response } from 'express';
import storyService from '../services/story.service';
import { STORIES_LIMIT } from '../config/constants';
import { StoryModel } from '../models/story.model';

export class StoryController {
    async getTopStories (req: Request, res: Response, next: NextFunction) {
        let limit = req.params.limit ? parseInt(req.params.limit) : STORIES_LIMIT;
        try {
            console.log('Get top stories...');
            let stories = await storyService.getTopStories({}, limit);
            return res.status(200).json({
                status: 200,
                data: stories, //JSON.parse(stories.toString()),
                message: 'Successfully retrieved top stories.'
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    async getStoryDetails(req: Request, res: Response, next: NextFunction) {
        let id = parseInt(req.params.id);
        try {
            console.log('Get story details...');
            let story: StoryModel = await storyService.getStoryDetails({}, id);
            return res.status(200).json({
                status: 200,
                data: story, //JSON.parse(stories.toString()),
                message: 'Successfully retrieved story details.'
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

    async saveTopStories(req: Request, res: Response, next: NextFunction) {
        try {
            //let limit = req.params.limit ? parseInt(req.params.limit) : STORIES_LIMIT;
            console.log(req.body);
            let limit = req.body.limit ? parseInt(req.body.limit) : STORIES_LIMIT;
            console.log('Save top stories...');
            let topStories = await storyService.getTopStories({}, limit);
            let storyDetailList : StoryModel[] = [];
            for(let ctr = 0; ctr < topStories.length; ctr ++) {
                let story: StoryModel = new StoryModel(await storyService.getStoryDetails({}, topStories[ctr]));
                storyDetailList.push(story);
                //get kids details recursive
                if(story.kids && story.kids.length > 0) {
                    story.kidDetailsList = new Array(story.kids.length);
                    for(let ctr = 0; ctr < story.kids.length; ctr++) {
                        await storyService.getChildDetails(story.kidDetailsList, story, story.kids[ctr]);
                    }
                }
                await storyService.saveStories(story, story.kidDetailsList);
            }
            return res.status(200).json({
                status: 200,
                message: 'Successfully saved top stories.'
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
}
