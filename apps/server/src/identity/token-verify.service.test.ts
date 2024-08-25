import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenVerifyService } from './token-verify.service';

describe('TokenVerifyService', () => {
  let tokenVerifyService: TokenVerifyService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({});
    tokenVerifyService = new TokenVerifyService(jwtService);
  });

  describe('parse', () => {
    it('should return the parsed token if it is valid', () => {
      // Arrange
      const token = 'validToken';
      const parsedToken = { userId: 'exampleUserId' };
      jest.spyOn(jwtService, 'verify').mockReturnValueOnce(parsedToken);

      // Act
      const result = tokenVerifyService.parse(token);

      // Assert
      expect(result).toEqual(parsedToken);
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });

    it('should throw a BadRequestException if the token is not valid', () => {
      // Arrange
      const token = 'invalidToken';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      // Act & Assert
      expect(() => tokenVerifyService.parse(token)).toThrow(
        BadRequestException,
      );
      expect(jwtService.verify).toHaveBeenCalledWith(token);
    });
  });
});
