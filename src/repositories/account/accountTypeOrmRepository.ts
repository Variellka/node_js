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

  public async getByUsername(username: string): Promise<IAccount | null> {
    const data: IAccount | null = await AppDataSource.getRepository(Account).findOne({ where: { username } });
    return data ? data : null;
  }

  public async getById(id: string): Promise<IAccount | null> {
    const data: IAccount | null = await AppDataSource.getRepository(Account).findOne({ where: { _id: id } });
    return data ? data : null;
  }

  public async update(entity: IAccount): Promise<boolean> {
    await AppDataSource.getRepository(Account).update({ _id: (entity as Account)._id }, entity as Account);
    return true;
  }

  public async delete(entity: IAccount): Promise<boolean> {
    await AppDataSource.getRepository(Account).delete({ _id: (entity as Account)._id });
    return true;
  }
}
