import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class UserCourse extends Model {}

UserCourse.init(
	{
		idUser: {
			type: Dt.INTEGER,
		},
		idCourse: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'User_Course',
		timestamps: false,
	}
);

export default UserCourse;
