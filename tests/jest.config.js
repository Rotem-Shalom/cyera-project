/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // חשוב! כדי ש-jest יזהה את הקבצים
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  verbose: true
};
