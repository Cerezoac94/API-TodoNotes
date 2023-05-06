import Subject from './subject/Subject.model.js';
import Course from './course/Course.model.js';
import Role from './role/Role.model.js';
import Resource from './resource/Resource.model.js';
import User from './user/User.model.js';
import UserCourse from './userCourse/UserCourse.model.js';
import SubjectCourse from './subjectCourse/SubjectCourse.model.js';

User.belongsTo(Role, {
	foreignKey: 'idRole',
	onDelete: 'RESTRICT',
});

Role.hasMany(User, {
	foreignKey: 'idRole',
});
// User_Course
User.belongsToMany(Course, {
	through: UserCourse,
	foreignKey: 'idUser',
});

Course.belongsToMany(User, {
	through: UserCourse,
	foreignKey: 'idCourse',
});

// Subject_Course
Course.belongsToMany(Subject, {
	through: SubjectCourse,
	foreignKey: 'idCourse',
});

Subject.belongsToMany(Course, {
	through: SubjectCourse,
	foreignKey: 'idSubject',
});

// Resource subject
Resource.belongsTo(Subject, {
	foreignKey: 'idSubject',
	onDelete: 'CASCADE',
});

Subject.hasMany(Resource, {
	foreignKey: 'idSubject',
});

export { Subject, Course, Role, Resource, User };
