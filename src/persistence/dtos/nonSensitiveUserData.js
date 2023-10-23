export default class nonSensitiveUserDto {
    constructor(user) {
        this._id = user._id
        this.role = user.role
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
    };
};