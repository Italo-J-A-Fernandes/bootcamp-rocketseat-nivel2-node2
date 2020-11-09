import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import Users from '../models/Users';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: Users;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    return { user };
  }
}

export default AuthenticateUserService;
