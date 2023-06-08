import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Resource extends Model {}

Resource.init(
	{
		title: {
			type: Dt.STRING(30),
			allowNull: false,
		},
		description: {
			type: Dt.TEXT,
		},
		url: {
			type: Dt.TEXT,
			allowNull: false,
		},
		idResourceType: {
			type: Dt.INTEGER,
			allowNull: false,
		},
		idTopic: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'Resource',
		timestamps: false,
	}
);

export default Resource;
