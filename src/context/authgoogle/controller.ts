import { createClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import { config } from '../../config/config';
const { ANON_KEY_SUPABASE, URL_SUPABASE } = config();

const supabase = createClient(URL_SUPABASE, ANON_KEY_SUPABASE);

export const signInWithGoogleCallback = async function (
  _req: Request,
  res: Response,
) {
  res.json({ message: 'Hello World from Callback' });
};

export const signInWithGoogle = async (_req: Request, res: Response) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/v1/callback',
      //   redirectTo: `${URL_CALLBACK_SUPABASE}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  console.log(data);

  if (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }

  if (data.url) {
    res.redirect(data.url);
  }
};

export const verifyTokenFromGoogle = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token);
  const {
    data: { user },
  } = await supabase.auth.getUser(token);
  console.log(user);
  return user;
};

export const generateNewRefreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.params;
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  const { session, user } = data;
  if (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  console.log(
    `session: ${session?.access_token}, ${session?.expires_at}, ${session?.refresh_token}, user: ${user}`,
  );
};
