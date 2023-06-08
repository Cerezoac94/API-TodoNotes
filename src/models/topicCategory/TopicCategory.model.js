import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class TopicCategory extends Model {}

TopicCategory.init(
	{
		idTopic: {
			type: Dt.INTEGER,
			allowNull: false,
		},
		idCategory: {
			type: Dt.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize: conn,
		modelName: 'Topic_Category',
		timestamps: false,
	}
);

export default TopicCategory;
