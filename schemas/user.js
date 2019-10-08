module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    username: {
      type: DataTypes.CHAR(10), // 字段类型
      allowNull: false, // 不为空
      unique: true // 字段是否UNIQUE
    },
    gender: DataTypes.INTEGER // 如果只有类型，可以直接这么设置
  },
  {
    tableName: 'user',
    timestamps: true, // 是否需要增加createdAt、updatedAt字段
    createdAt: false, // 不需要createdAt字段
    updatedAt: 'endtime', // 修改updatedAt字段名称为endtime
    freezeTableName: true // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置为true
  })
}
