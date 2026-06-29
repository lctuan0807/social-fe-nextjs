'use server';

import { signIn } from "@/app/auth";

export async function authenticate(username: string, password: string) {
  // TODO: implement authentication logic
  console.log('🚀 ~ authenticate ~ username:', username);
  console.log('🚀 ~ authenticate ~ password:', password);

  try {
    const r = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    console.log('🚀 ~ authenticate ~ r:', r);
    return r;
  } catch (error) {
    console.error('🚀 ~ authenticate ~ error:', JSON.stringify(error));

    if ((error as any).name === 'InvalidEmailPassword') {
      return { error: (error as any).message, code: 1 };
    } else if ((error as any).name === 'InactiveUser') {
      return { error: (error as any).message, code: 2 };
    } else {
      return { error: "Internal server error", code: 0 };
    }
  }
}
