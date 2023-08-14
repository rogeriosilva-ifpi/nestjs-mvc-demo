import { Injectable } from '@nestjs/common';

export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    username: 'rogerio410',
    name: 'Rogério da Silva',
    email: 'rogerio410@gmail.com',
    password: '123',
  },
  {
    username: 'loira',
    name: 'Loira Silva',
    email: 'loira@gmail.com',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  async findOne(username: string): Promise<User> {
    return users.find((user) => user.username === username);
  }

  async validateUser(username, pwd): Promise<User | null> {
    const user = await this.findOne(username);

    if (user && user.password === pwd) {
      return user;
    }

    return null;
  }
}
