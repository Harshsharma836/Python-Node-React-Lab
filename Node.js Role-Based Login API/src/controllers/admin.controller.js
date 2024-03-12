import User from "../models/userModel.js";

const adminController = {
  // Get all userss
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({ role: "user" });

      const userProfiles = users.map((user) => ({
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      res.json(userProfiles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  },
};

export default adminController;
