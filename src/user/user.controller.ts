import {user} from './user';
import {UserService} from './user.service';

export class UserController {
    constructor(private userService: UserService) {
    }

    add(username: string, prenom: string, nom: string, mail: string): user {
        return this.userService.add(username, nom, prenom, mail);
    }

    getById(id: number): user | null {
        return this.userService.getById(id);
    }

    async getAllUser(): Promise<user[] | null> {
        return this.userService.getAllUser();
    }

    deleteUser(id: number): user | null {
        return this.userService.deleteUser(id);
    }

    updateUser(id: number, updatedUserData: Partial<user>): user | null {
        return this.userService.updateUser(id, updatedUserData);
    }
}