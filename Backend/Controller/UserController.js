import User from "../Model/UserSchema.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    const userdata = {
      userId: user._id,
      username: user.name,
      email: user.email,
      mobile: user.mobile,
    };

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      sucess: "true",
      message: "Login successful",
      userdata,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
