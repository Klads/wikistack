const Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost/wikistack');

const Page = db.define('page', {
	title: { 
		type:Sequelize.STRING,
		allowNull: false
	},
	urlTitle: { 
		type:Sequelize.STRING,
		allowNull: false
	},
	content: { 
		type:Sequelize.TEXT,
		allowNull: false
	},
	//page_photo: Sequelize.STRING
	status: {
		type:Sequelize.ENUM('open', 'closed'),
		defaultValue: 'open'
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {getterMethods: {
		route: function() { return '/wiki/' + this.urlTitle }
	}});

const User = db.define('user', {
	name: { 
		type:Sequelize.STRING,
		allowNull: false
	},
	email: { 
		type:Sequelize.STRING,
		allowNull: false
	}
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
	Page: Page,
	User: User,
	db: db
};