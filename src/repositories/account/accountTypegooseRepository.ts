import { hashPassword } from '../../helpers/hash';
import { IAccount, IAccountRepository } from '../../types/types';
import { Account, AccountModel } from '../../db/mongodb/models/account-model';

export default class AccountTypeOrmRepository implements IAccountRepository {
  public async create(entity: IAccount): Promise<IAccount> {
    const hashedPassword = await hashPassword(entity.password);
    await new AccountModel({
      ...entity,
      password: hashedPassword,
    }).save();
    return entity;
  }

  public async read(username: string): Promise<IAccount | null> {
    const data: IAccount | null = await AccountModel.findOne({ username });
    return data;
  }

  public async update(entity: IAccount): Promise<boolean> {
    const data: IAccount | null = await AccountModel.findOneAndUpdate({ _id: entity._id }, entity as Account);
    return data ? true : false;
  }

  public async delete(entity: IAccount): Promise<boolean> {
    const data = await AccountModel.deleteOne({ _id: entity._id });
    return data ? true : false;
  }
}
