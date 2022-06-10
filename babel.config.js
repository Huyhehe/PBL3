module.exports = {
  // mode: "production",
  // publicPath: process.env.NODE_ENV === "production" ? "/PBL3/" : "/",
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" },
    ], // `style: true` 会加载 less 文件
  ],
};
