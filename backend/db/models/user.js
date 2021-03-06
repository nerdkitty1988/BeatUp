"use strict";
const { Validator, col } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(
        "User",
		{
            username: {
                type: DataTypes.STRING,
				allowNull: false,
				validate: {
                    len: [3, 30],
					isNotEmail(value) {
                        if (Validator.isEmail(value)) {
                            throw new Error("Cannot be an email.");
						}
					},
				},
			},
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3, 50]
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [3, 75]
                },
            },
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
                    len: [3, 256],
				},
			},
            photoUrl: {
                type: DataTypes.STRING,
                validate: {
                    isUrl: true,
                },
            },
            zipcode: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [5],
                    is: /^[0-9]{5}(?:-[0-9]{4})?$/,
                },
            },
			hashedPassword: {
                type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
                    len: [60, 60],
				},
			},
		},
		{
            defaultScope: {
                attributes: {
                    exclude: [
                        "hashedPassword",
						"email",
						"createdAt",
						"updatedAt",
					],
				},
			},
			scopes: {
                currentUser: {
                    attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
                    attributes: {},
				},
			},
		}
    );
    User.associate = function (models) {
        // associations can be defined here
        const commentColumnMapping = {
            through: 'GroupComment',
            otherKey: 'groupId',
            foreignKey: 'userId',
            as: 'groupComments'
        }
        const memberColumnMapping = {
            through: 'GroupMember',
            otherKey:'groupId',
            foreignKey: 'userId',
            as: 'groupMembers'
        }
        const eventCommentColumnMapping = {
            through: "EventComment",
            otherKey: "eventId",
            foreignKey: "userId",
            as: "eventComments",
        };
        const participantColumnMapping = {
            through: 'EventParticipant',
            otherKey:'userId',
            foreignKey: 'eventId',
            as: 'groupParticipants'
        };
        const likeColumnMapping = {
            through: "EventLike",
            otherKey: "userId",
            foreignKey: "eventId",
            as: "eventLikesUser",
        };
        const rsvpColumnMapping = {
            through: 'Rsvp',
            otherKey:'userId',
            foreignKey: 'eventId',
            as: 'rsvpStatus'
        };
        User.belongsToMany(models.Group, commentColumnMapping);
        User.belongsToMany(models.Group, memberColumnMapping);
        User.belongsToMany(models.Event, eventCommentColumnMapping);
        User.belongsToMany(models.Event, participantColumnMapping);
        User.belongsToMany(models.Event, likeColumnMapping);
        User.belongsToMany(models.Event, rsvpColumnMapping);
        User.hasMany(models.EventParticipant, {foreignKey: "userId"});
        User.hasMany(models.Rsvp, {foreignKey: "userId"});
        User.hasMany(models.EventLike, {foreignKey: "userId"});
        User.hasMany(models.EventComment, {foreignKey: "userId"});
        User.hasMany(models.Event, {foreignKey: "eventOwnerId"})
    };



    User.prototype.toSafeObject = function () {
        // remember, this cannot be an arrow function
        const { id, username, email, firstName, lastName, zipcode, photoUrl } = this; // context will be the User instance
        return { id, username, email, firstName, lastName, zipcode, photoUrl };
    };

    User.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    User.getCurrentUserById = async function (id) {
        return await User.scope("currentUser").findByPk(id);
    };

    User.login = async function ({ credential, password }) {
        const { Op } = require("sequelize");
        const user = await User.scope("loginUser").findOne({
            where: {
                [Op.or]: {
                    username: credential,
                    email: credential,
                },
            },
        });
        if (user && user.validatePassword(password)) {
            return await User.scope("currentUser").findByPk(user.id);
        }
    };

    User.signup = async function ({ username, email, firstName, lastName, zipcode, photoUrl, password }) {
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({
            username,
            email,
            firstName,
            lastName,
            zipcode,
            photoUrl,
            hashedPassword,
        });
        return await User.scope("currentUser").findByPk(user.id);
    };
	return User;
};
