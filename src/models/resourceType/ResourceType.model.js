import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class ResourceType extends Model {}

ResourceType.init(
	{
		type: {
			type: Dt.STRING,
			allowNull: false,
		},
		image: {
			type: Dt.TEXT,
		},
	},
	{
		sequelize: conn,
		modelName: 'ResourceType',
		timestamps: false,
	}
);

export default ResourceType;
