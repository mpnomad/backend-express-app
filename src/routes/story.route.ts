import { Router } from 'express';
import { StoryController } from '../controllers/story.controller';

const storyRouter = Router();
const storyController = new StoryController();
storyRouter.get('/get-top-stories/:limit', storyController.getTopStories);
storyRouter.get('/get-story-details/:id', storyController.getStoryDetails);
storyRouter.post('/save-top-stories', storyController.saveTopStories);

export default storyRouter;
