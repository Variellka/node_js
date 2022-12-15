import { hashPassword } from '../../helpers/hash';
import { IAccount, IAccountRepository } from '../../types/types';
import { AccountModel } from '../../db/mongodb/models/account-model';

export default class AccountTypeOrmRepository implements IAccountRepository {
  public async create(entity: IAccount): Promise<IAccount> {
    const hashedPassword = await hashPassword(entity.password);
    await new AccountModel({
      ...entity,
      password: hashedPassword,
    }).save();
    return entity;
  }
}
