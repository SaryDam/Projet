import fs from 'fs';
import { UserJSONService } from './user.json-service';
import { user } from './user';

jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {

let sut : UserJSONService;

beforeEach(() => {
    sut = new UserJSONService;
    jest.resetAllMocks();
});

describe
})