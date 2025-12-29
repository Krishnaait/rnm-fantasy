export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Custom login URL - redirects to our own login page (not Manus OAuth)
export const getLoginUrl = () => {
  return "/login";
};
