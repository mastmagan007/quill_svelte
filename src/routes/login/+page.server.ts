import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/components/Login_Form/schema';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, '/');
  }
  const form = await superValidate(formSchema);

  return {
    form,
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
  let form;

    try {
		  const form = await superValidate(request, formSchema);
      const key = await auth.useKey('username', form.data.username, form.data.password);

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

      return fail(400, {
        form
      });
    }
    throw redirect(302, '/');

    // return {
    //   form
    // };
  },
};

