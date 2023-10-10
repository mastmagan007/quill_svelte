import type { LayoutServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if(session){
		return{
			user: session.user.username
		}
	}
   
};



