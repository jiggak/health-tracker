import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
   return /\d\d\d\d-\d\d-\d\d/.test(param);
};