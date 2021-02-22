const User = require('../models/user');

module.exports = {
  findOrCreate: async (oAuthData) => {
    try {
      console.log('in findOrCreate');
      const user = await User.findOne({ oAuthId: oAuthData.id });
      if (!user) {
        console.log('no user found');
        const newUser = new User({
          oAuthId: oAuthData.id, 
          username: oAuthData.username,
          displayName: oAuthData.displayName || '',
          profileUrl: oAuthData.profileUrl,
          photos: oAuthData.photos
        });
        await newUser.save();
        return newUser;
      }
      return user;
    } catch (e) {
      return Error('User not found');
    }
  },
  findById: async (id) => {
    return User.findOne({ oAuthId: id });
  }
};