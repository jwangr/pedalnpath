// jest.config.js
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  coverageProvider: 'v8',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

export default createJestConfig(customJestConfig)
