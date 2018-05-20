import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userContrller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userContrller = module.get<UserController>(UserController);
  });

  describe('fetchAll', () => {
    it('should return array of users', async () => {
      const result = ['test user'];
      jest.spyOn(userService, 'findAll').mockImplementation(() => result);

      expect(await userContrller.fetchAll()).toBe(result);
    });
  });
});
