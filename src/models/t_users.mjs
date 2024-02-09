const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "cette utilisateur est déjà pris" },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export { UserModel };
