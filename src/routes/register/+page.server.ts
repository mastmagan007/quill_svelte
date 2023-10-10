import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/components/Register_Form/schema';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) {
    throw redirect(302, '/');
  }

  // Use superValidate to validate the form data
  const form = await superValidate(formSchema);

  return {
    form,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    let form;
    try {
      // Use superValidate to validate the form data
      const form = await superValidate(request, formSchema);
      console.log('SUCCESS');
      console.log(form);

      // Create the user using the expected structure
      await auth.createUser({
        attributes: {
          username: form.data.username,
        },
        key: {
          providerId: 'username', // Update this to your provider ID
          providerUserId: form.data.username,
          password: form.data.password, // Set the password separately
        },
      });
  
    } catch (err) {
      console.error(err);

      return fail(400, {
        form
      });
    }
    throw redirect(302, '/login');

    // return {
    //   form
    // };
  },
};
