import Category from './category/Category.model.js';
import Resource from './resource/Resource.model.js';
import Topic from './topic/Topic.model.js';
import User from './user/User.model.js';
import TopicCategory from './topicCategory/TopicCategory.model.js';
import Notes from './notes/Notes.model.js';
import Status from './status/Status.model.js';
import ResourceType from './resourceType/ResourceType.model.js';

// Category - User.
Category.belongsTo(User, {
	foreignKey: 'idUser',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
User.hasMany(Category, {
	foreignKey: 'idUser',
});

// Category - Topic, intermedia TopicCategory".
Category.belongsToMany(Topic, {
	through: TopicCategory,
	foreignKey: 'idCategory',
});
Topic.belongsToMany(Category, {
	through: TopicCategory,
	foreignKey: 'idTopic',
});

// Topic - status
Topic.belongsTo(Status, {
	foreignKey: 'idStatus',
	onDelete: 'RESTRICT',
	onUpdate: 'CASCADE',
});
Status.hasMany(Topic, {
	foreignKey: 'idStatus',
});

// Resource - Topic
Resource.belongsTo(Topic, {
	foreignKey: 'idTopic',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
});
Topic.hasMany(Resource, {
	foreignKey: 'idTopic',
});

// Notes - Topic
Notes.belongsTo(Topic, {
	foreignKey: 'idTopic',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Topic.hasMany(Notes, {
	foreignKey: 'idTopic',
});

//Resource - ResourceType
Resource.belongsTo(ResourceType, {
	foreignKey: 'idResourceType',
	onDelete: 'RESTRICT',
	onUpdate: 'CASCADE',
});
ResourceType.hasMany(Resource, {
	foreignKey: 'idResourceType',
});

// Status - User
Status.belongsTo(User, {
	foreignKey: 'idUser',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
User.hasMany(Status, {
	foreignKey: 'idUser',
});

// ResourceType - User
ResourceType.belongsTo(User, {
	foreignKey: 'idUser',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
User.hasMany(ResourceType, {
	foreignKey: 'idUser',
});

export {
	Category,
	Resource,
	Topic,
	User,
	TopicCategory,
	Notes,
	Status,
	ResourceType,
};
