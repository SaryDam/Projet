import { user } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {
    add(username: string): user {
        throw new Error('Method not implemented.');
    }

    getById(id: number): user | null {
        throw new Error('Method not implemented.');
    }
}