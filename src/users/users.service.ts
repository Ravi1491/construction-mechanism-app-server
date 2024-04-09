import { Injectable } from '@nestjs/common';
import { JwtPayload, decode, sign } from 'jsonwebtoken';

import { applicationConfig } from 'config';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserInput } from './dto/update-user.input';
import { generateOtp } from 'src/utils/helper';
import { genSalt, hash } from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserInput: CreateUserInput, options = {}) {
    const hashPassword = await hash(createUserInput.password, await genSalt());

    const emailOtp = generateOtp();

    const payload = {
      ...createUserInput,
      password: hashPassword,
      emailOtp,
    };

    return this.userModel.create(payload, options);
  }

  findOne(condition = {}, options = {}) {
    return this.userModel.findOne({
      where: condition,
      ...options,
    });
  }

  async findAndCountAll(payload = {}, options = {}) {
    const { rows, count } = await this.userModel.findAndCountAll({
      where: payload,
      ...options,
    });

    return {
      total: count,
      rows,
    };
  }

  async update(payload: UpdateUserInput, condition = {}, options = {}) {
    return this.userModel.update(payload, {
      where: condition,
      ...options,
      returning: true,
    });
  }

  async remove(condition = {}) {
    return this.userModel.destroy({
      where: condition,
      individualHooks: true,
    });
  }

  generateToken({ id, email }: { id: string; email: string }) {
    const token = sign(
      {
        id,
        email,
      },
      applicationConfig.jwt.secret,
      {
        expiresIn: applicationConfig.jwt.expiresIn,
        algorithm: 'HS256',
        issuer: applicationConfig.jwt.issuer,
      },
    );

    const decodedToken = decode(token) as JwtPayload;

    return {
      token,
      expiresIn: decodedToken.exp - decodedToken.iat,
    };
  }
}
