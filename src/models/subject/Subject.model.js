import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Subject extends Model {}

Subject.init(
	{
		name: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		description: {
			type: Dt.STRING,
		},
	},
	{
		sequelize: conn,
		modelName: 'Subject',
		timestamps: false,
	}
);

export default Subject;
