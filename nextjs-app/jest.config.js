import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./", // Path to nextjs-app
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Handle module aliases (if you use them in your app) - can try to generalise with: '^@/(.*)$': '<rootDir>/src/$1',
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/generated/(.*)$": "<rootDir>/src/generated/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",

    // Stub react-leaflet and leaflet
    "^react-leaflet$": "<rootDir>/__mocks__/react-leaflet.js",
    "^leaflet$": "<rootDir>/__mocks__/leaflet.js",
    "^leaflet-defaulticon-compatibility$":
      "<rootDir>/__mocks__/leaflet-defaulticon-compatibility.js",
  },

  //   or handling ES Modules
  transformIgnorePatterns: ["/node_modules/(?!react-leaflet|leaflet)/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default createJestConfig(customJestConfig);
