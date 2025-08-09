import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determine base for GitHub Pages automatically during CI builds
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isPagesProject =
  process.env.GITHUB_ACTIONS === 'true' &&
  !!repoName &&
  // user/org site repos end with .github.io and should use '/'
  !repoName.endsWith('.github.io')

export default defineConfig({
  plugins: [react()],
  base: isPagesProject ? `/${repoName}/` : '/',
})


