import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Resource extends Model {}

Resource.init(
	{
		type: {
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
		idSubject: {
			type: Dt.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: conn,
		modelName: 'Resource',
		timestamps: false,
	}
);

export default Resource;
