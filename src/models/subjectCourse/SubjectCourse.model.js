import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class SubjectCourse extends Model {}

SubjectCourse.init(
	{
		idSubject: {
			type: Dt.INTEGER,
		},
		idCourse: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'Subject_Course',
		timestamps: false,
	}
);
export default SubjectCourse;
