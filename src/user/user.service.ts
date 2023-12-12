import {user} from "./user";

export interface UserService {

    add(username: string, prenom: string, nom: string, mail: string): user;

    getById(id: number): user | null;

    getAllUser(): Promise<user[] | null>;

    deleteUser(id: number): user | null;

    updateUser(id: number, updatedUserData: Partial<user>): user | null;
}