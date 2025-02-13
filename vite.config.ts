import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
  preview: {
    port: 4305,
    host: '0.0.0.0',
  },
  server: {
    port: 4205,
    host: '0.0.0.0',
    fs: {
      allow: ['../..'],
    },
  },
	test: {
		include: ['src/**/*.test.ts'],
		globals: true,
		coverage: {
			reporter: 'lcov',
			include: ['**/*.ts']
		}
	}
});
