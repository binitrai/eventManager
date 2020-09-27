import {
    getUUID,
    getCreatedAt
} from "../util";

const createUser = (name, email) => {
    const user = Object.create(null);
    user.id = getUUID("user");
    user.name = name;
    user.email = email || name;
    user.createdAt = getCreatedAt();
    user.lastModified = user.createdAt;
    return user;
 }

 export default createUser;