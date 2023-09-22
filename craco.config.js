const config = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        module: {
          ...webpackConfig.module,
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
            },
          ],
        },
      };
    },
  },
};

module.exports = config;
