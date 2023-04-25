import User from "../models/User.js";

export const allUsers = async (req, res) => {
  try {
    const { id } = req.params;
    let allUser = await User.find();
    allUser = allUser.filter((user) => user.id !== id);
    res.status(200).json(allUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    res.status(200).json(friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }
    await user.save();
    await friend.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
