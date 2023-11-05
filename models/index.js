const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment')

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment };