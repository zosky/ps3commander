module.exports = {
  // set app base path @prod for git-hub pages
  publicPath: process.env.NODE_ENV === "production" ? "/ps3commander/" : "/",
};
