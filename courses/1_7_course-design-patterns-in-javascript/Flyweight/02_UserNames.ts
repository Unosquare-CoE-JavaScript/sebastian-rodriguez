export class User {
  constructor(public fullName: string) {}
}

export class User2 {
  static strings: any[] = [];
  names: any[];
  constructor(public fullName: string) {
    let getOrAdd = function (s: any) {
      let idx = User2.strings.indexOf(s);
      if (idx !== -1) {
        return idx;
      } else {
        User2.strings.push(s);
        return User2.strings.length - 1;
      }
    };

    this.names = fullName.split(' ').map(getOrAdd);
  }
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const randomString = () => {
  let result = [];
  for (let x = 0; x < 10; ++x) {
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  }
  return result.join('');
};
