module.exports = {
  presets: ['module:@react-native/babel-preset'],
    plugins: [
    // other plugins
    'react-native-worklets/plugin',  // this should be the last plugin
  ],
};
