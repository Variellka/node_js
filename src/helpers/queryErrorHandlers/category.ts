import { QueryObject } from '../../types/types';

export const validateCategoryQuery = (query: QueryObject): void => {
  const errors: string[] = [];

  if (query.includeProducts && query.includeProducts.toString() !== 'true')
    errors.push('includeProducts query is invalid');
  if (query.includeTop3Products && query.includeTop3Products !== 'top')
    errors.push('includeTop3Products query is invalid');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
