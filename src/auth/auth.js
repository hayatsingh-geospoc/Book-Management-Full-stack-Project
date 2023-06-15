export const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token);
};

export default auth;
