import { v4 as uuidv4 } from "uuid";

export function UUID24C() {
    const uuid = uuidv4().replace(/-/g, ''); 
    return uuid.substring(0, 24);
}

