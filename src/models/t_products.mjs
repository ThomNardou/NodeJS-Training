const ProductModel = (sequelize, DataTypes) => {  // = Mock-Products.mjs
  return sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updateAt: false,
    }
  );
};

export { ProductModel }