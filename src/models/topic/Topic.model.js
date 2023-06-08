import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Topic extends Model {}
Topic.init(
	{
		name: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		description: {
			type: Dt.TEXT,
		},
		creationDate: {
			type: Dt.DATEONLY,
		},
		image: {
			type: Dt.TEXT,
		},
		idStatus: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'Topic',
		timestamps: false,
	}
);

export default Topic;
