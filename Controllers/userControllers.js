import User from "../models/userSchema.js";


export const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();

        res.json({
            message: "All Users Fetched",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Fetching Users",
            error
        });
    }
};


export const postUser = async (req, res) => {
    try {
        const data = req.body;

        const response = await User.create(data);

        res.json({
            message: "User Added",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Adding User",
            error
        });
    }
};


export const updateUser = async (req, res) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const response = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        res.json({
            message: "User Updated",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Updating User",
            error
        });
    }
};


export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id;

        const response = await User.findByIdAndDelete(id);

        res.json({
            message: "User Deleted",
            response
        });

    } catch (error) {
        res.json({
            message: "Error Deleting User",
            error
        });
    }
};

    export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    res.status(200).json({
      message: "Login Success",
      user: user
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }


};