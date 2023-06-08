import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Notes extends Model {}

Notes.init(
	{
		title: {
			type: Dt.STRING,
		},
		text: {
			type: Dt.TEXT,
		},
		image: {
			type: Dt.TEXT,
		},
		idTopic: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'Notes',
		timestamps: false,
	}
);

export default Notes;
