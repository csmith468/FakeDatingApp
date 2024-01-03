import { User } from "./user";

export class UserParams {
    gender = "any";
    minAge = 18;
    maxAge = 99;
    pageNumber = 1;
    pageSize = 12;
    orderBy = 'lastActive';
    photoRequired = true;

    constructor(user: User) {
        // this.gender = user.gender === 'female' ? 'male' : 'female';
        // this.gender = 'any';
    }
}