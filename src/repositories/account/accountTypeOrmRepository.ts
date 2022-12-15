import { AppDataSource } from '../../db/postgres';
import { hashPassword } from '../../helpers/hash';
import { IAccount, IAccountRepository } from '../../types/types';
import { Account } from '../../db/postgres/models/account-model';

export default class AccountTypeOrmRepository implements IAccountRepository {
  public async create(entity: IAccount): Promise<IAccount> {
    const hashedPassword = await hashPassword(entity.password);
    await AppDataSource.getRepository(Account).save({
      ...entity,
      password: hashedPassword,
    } as Account);
    return entity;
  }
}
