const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'cypress/support/commands.ts',
    video: false,
    env: {
      backendUrl: "https://backend:8000"
    }
  },
})