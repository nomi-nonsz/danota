import Csrf from "csrf";

const csrfInstance = new Csrf();

const _SECRET = process.env["NEXTAUTH_SECRET"] || "787878";

export const genCsrf = () => csrfInstance.create(_SECRET);
export const verifyCsrf = (token: string) => csrfInstance.verify(_SECRET, token);