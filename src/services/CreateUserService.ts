import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Users from '../models/Users';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<Users> {
    const usersRepository = getRepository(Users);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Emasil address already used.');
    }

    const hashedPassord = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassord,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
