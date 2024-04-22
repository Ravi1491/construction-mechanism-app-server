import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUser extends HttpException {
  constructor() {
    super(
      {
        message: 'User does not exist',
        code: 'INVALID_USER',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidRecipientEmail extends HttpException {
  constructor() {
    super(
      {
        message: 'Invalid Recipient Email',
        code: 'INVALID_RECIPIENT_EMAIL',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
