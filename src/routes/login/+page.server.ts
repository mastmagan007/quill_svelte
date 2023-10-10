import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const { username, password } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>;

    try {
      const key = await auth.useKey('username', username, password);

      // Create a session object with the required properties
      const session = {
        userId: key.userId,
        attributes: {}, // You can add any session attributes if needed
      };

      // Create the session using the session object
      const createdSession = await auth.createSession(session);

      // Set the session
      locals.auth.setSession(createdSession);
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Could not login user.' });
    }
    throw redirect(302, '/');
  },
};
