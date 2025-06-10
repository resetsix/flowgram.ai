import { config } from "dotenv";
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: [
      {find: "@api", replacement: path.resolve(__dirname, './src/api') },
      {find: "@application", replacement: path.resolve(__dirname, './src/application') },
      {find: "@server", replacement: path.resolve(__dirname, './src/server') },
      {find: "@config", replacement: path.resolve(__dirname, './src/config') },
      {find: "@workflow", replacement: path.resolve(__dirname, './src/workflow') },
    ],
  },
  test: {
    globals: true,
    mockReset: false,
    environment: 'jsdom',
    testTimeout: 15000,
    setupFiles: [path.resolve(__dirname, './src/workflow/__tests__/setup.ts')],
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/__mocks__**',
      '**/node_modules/**',
      '**/dist/**',
      '**/lib/**', // lib 编译结果忽略掉
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    env: {
      ...config({ path: path.resolve(__dirname, './.env/.env.test') }).parsed
    }
  },
});
