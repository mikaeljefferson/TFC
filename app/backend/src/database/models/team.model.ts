import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Match from './match.model';

class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Team;
