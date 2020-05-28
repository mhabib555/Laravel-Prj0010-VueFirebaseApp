export default class Gate {

    constructor(user){
        this.user = user;
    }

    isAdmin(user){
        return this.user.role === 'admin';
    }

    isUser(user){
        return this.user.role === 'user';
    }

}
