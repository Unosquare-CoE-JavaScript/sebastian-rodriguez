import { beforeAll, describe, expect, it } from 'vitest';
import { randomString, User, User2 } from './02_UserNames';

describe('Flyweight 2', () => {
  let users: User[] = [];
  let users2: User2[] = [];
  let firstNames: string[] = [];
  let lastName: string[] = [];

  beforeAll(() => {
    for (let i = 0; i < 100; ++i) {
      firstNames.push(randomString());
      lastName.push(randomString());
    }
    for (let first of firstNames) {
      for (let last of lastName) {
        users.push(new User(`${first} ${last}`));
        users2.push(new User2(`${first} ${last}`));
      }
    }
  });

  describe('User Names', () => {
    it('should know how may chars have users', () => {
      expect(JSON.stringify(users).length).toBe(370001);
    });

    it('should be less users 2', () => {
      const users2length = [users2, User2.strings]
        .map((x) => JSON.stringify(x).length)
        .reduce((x, y) => x + y);
      expect(users2length).toBe(541602);
    });
  });
});
