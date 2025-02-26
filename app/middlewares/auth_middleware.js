import { tokenDecode } from "../utility/token_util.js";

export default (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  try {
    const decoded = tokenDecode(token);
    console.log("Decoded Token:", decoded);
    req.headers.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Error decoding token", error: error.message });
  }
};
