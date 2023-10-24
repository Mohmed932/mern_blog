export const CreatePost = (req, res) => {
  console.log(req.body);
  return res.json(req.body);
};
