import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Status extends Model {}

Status.init(
	{
		status: {
			type: Dt.STRING(50),
			allowNull: false,
		},
		idUser: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'Status',
		timestamps: false,
	}
);

export default Status;
