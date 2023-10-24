import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
const externalPackages = [
  "@craftjs/core",
  'react',
  'react-dom',
  'antd',
  "@ant-design/icons",
  "@emotion/css",
  "redux",
  "@reduxjs/toolkit",
  "react-redux",
  "ahooks"
]
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts()
  ],
  build: {
    sourceMap: true,
    lib: {
      entry: 'src/index.ts',
      fileName: (format) => `index/${format}.js`
    }
  },
  rollupOptions: {
    external: externalPackages,
    output: {
      // 配置 UMD 格式，使你的组件库可以在不同的环境中使用
      globals: {
        react: 'React',
        'react-dom': 'ReactDom'
      },
      // 配置 minify 选项，使输出文件更小
      minifyInternalExports: true
    }
  }
})
