import { getConnection } from 'typeorm';

export const useTransaction = async function useTransaction(cb) {
  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();

  try {
    await cb(queryRunner);
  } catch (e) {
    await queryRunner.rollbackTransaction();

    throw e;
  } finally {
    await queryRunner.release();
  }
};
