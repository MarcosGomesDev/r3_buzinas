import { HASH_AUTHORIZATION } from '@env';

export async function authorization(code: string): Promise<boolean> {
  if (code === HASH_AUTHORIZATION) {
    return true;
  }

  return false;
}
