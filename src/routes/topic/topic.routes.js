import { Router } from 'express';
import TopicController from '../../controllers/topic/Topic.controller.js';

const topicRoutes = Router();

topicRoutes.get('/:idUser', TopicController.getAllTopics);
topicRoutes.get('/id/:id', TopicController.getTopicById);
topicRoutes.post('/', TopicController.createTopic);
topicRoutes.post('/:idCategory', TopicController.createTopicToCategory);
topicRoutes.delete('/:id', TopicController.deleteTopic);
topicRoutes.put('/:id', TopicController.updateTopic);

export default topicRoutes;
