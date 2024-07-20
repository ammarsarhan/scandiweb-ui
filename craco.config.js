/* CRACO allows us to override the default webpack configuration of Create React App without using 'eject' 
and without creating a custom fork of CRA. */
/* This is useful to allow the use of path aliases in Typescript */

const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@So_on': path.resolve(__dirname, 'src/so_on'),
    }
  },
};