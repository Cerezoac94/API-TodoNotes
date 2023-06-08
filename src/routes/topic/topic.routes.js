import { Router } from 'express';
import TopicController from '../../controllers/topic/Topic.controller.js';

const topicRoutes = Router();

topicRoutes.get('/', TopicController.getAllTopics);
topicRoutes.get('/:id', TopicController.getTopicById);
topicRoutes.post('/', TopicController.createTopic);
topicRoutes.delete('/:id', TopicController.deleteTopic);
topicRoutes.put('/:id', TopicController.updateTopic);

export default topicRoutes;
