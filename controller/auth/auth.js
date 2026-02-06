import jwt from "jsonwebtoken";

const generateAccessToken = async (user) => {
  const token = jwt.sign({ username: user.usename }, "abcd", {
    expiresIn: "15min",
  });
  return token;
};

const generateRefreshToken = async (user) => {
  const token = jwt.sign({ username: user.usename }, "cdef", {
    expiresIn: "7d",
  });
  return token;
};

const authenticateToken = async (req, res, next) => {
  try {
    console.log("HEADERS: ", req.headers);
    console.log("SPLIT: ", req.headers["authorization"].split(" "));

    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json("Invalid token");
    }
    jwt.verify(token, "abcd", async (error, decoded) => {
      if (error) {
        return res.status(403).json("Token Expired");
      }
      
      next();
    });
  } catch (error) {
    console.log(error);
  }
};

export { generateAccessToken, generateRefreshToken, authenticateToken };
