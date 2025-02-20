import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // JSDOM als Testumgebung setzen
  },
});