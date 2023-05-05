import { Router } from 'express';
import SubjectController from '../../controllers/subject/Subject.controller.js';

const subjectRoutes = Router();

subjectRoutes.get('/', SubjectController.getAllSubjects);
subjectRoutes.get('/:id', SubjectController.getSubjectById);
subjectRoutes.post('/', SubjectController.createSubject);
subjectRoutes.put('/:id', SubjectController.updateSubject);
subjectRoutes.delete('/:id', SubjectController.deleteSubject);

export default subjectRoutes;
