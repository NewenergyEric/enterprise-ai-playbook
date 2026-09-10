import { sites } from '@openai/sites-vite-plugin';
import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
import { academyDev } from './scripts/academy-dev.mjs';
import { agentCasesDev } from './scripts/agent-cases-dev.mjs';

// The website is exported as static files; it has no server-side bindings.
export default defineConfig({
  server: {
    host: '127.0.0.1',
    watch: {
      ignored: [
        '**/academy/dist/**',
        '**/academy/work/**',
        '**/agent-cases/site/**',
        '**/.generated/**',
      ],
    },
  },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [academyDev(), agentCasesDev(), vinext(), sites()],
});
