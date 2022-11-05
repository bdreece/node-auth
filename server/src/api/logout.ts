import type { Handler } from '../types';

const logout: Handler = (_, res) =>
  res
    .status(200)
    .setHeader(
      'Set-Cookie',
      `RefreshToken=undefined; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`,
    )
    .json({
      success: true,
      data: 'Logged out!',
    });

export default {
  get: logout,
};
