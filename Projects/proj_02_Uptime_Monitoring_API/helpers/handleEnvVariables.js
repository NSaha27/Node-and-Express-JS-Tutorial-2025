/*
  Title: Handle Environment Variables
  Description: Here, based on the environment variable passed through the cli we will set on which port our application should be running.
  Author: Niladri Saha
  Date: 04-11-2025
*/

// module scaffolding
const env = {};

env.staging = {
  port: 3000,
  environment: "staging"
};

env.production = {
  port: 5000,
  environment: "production"
};

env.givenEnvVar = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

env.currentEnvVar = typeof env[env.givenEnvVar] === "object" ? env[env.givenEnvVar] : env.staging;

export default env;
