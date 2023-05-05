import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Course extends Model {}

Course.init(
	{
		name: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		schedule: {
			type: Dt.STRING(25),
		},
		startDate: {
			type: Dt.DATEONLY,
		},
		endDate: {
			type: Dt.DATEONLY,
		},
	},
	{
		sequelize: conn,
		modelName: 'Course',
		timestamps: false,
	}
);

export default Course;
