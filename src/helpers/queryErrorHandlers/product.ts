import { QueryObject } from '../../types/types';

export const validateProductQuery = (query: QueryObject): void => {
  const errors: string[] = [];

  if (query.price) {
    const [min, max] = query.price.split(':').map((value: any) => parseInt(value));
    if (isNaN(Number(min)) || isNaN(Number(max))) {
      errors.push('price is invalid');
    }
  }
  if (query.minRating) {
    if (isNaN(Number(query.minRating))) {
      errors.push('rating is invalid');
    }
    if (query.minRating < 0 || query.minRating > 10) {
      errors.push('totalRating should be in the range from 0 to 10');
    }
  }
  if (query.limit && isNaN(Number(query.limit))) errors.push('limit is invalid');
  if (query.offset && isNaN(Number(query.offset))) errors.push('offset is invalid');

  if (errors.length !== 0) {
    throw {
      message: errors,
      status: 400,
    };
  }
};
