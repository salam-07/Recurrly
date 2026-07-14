import fs from 'fs';
import path from 'path';

// Read the app.json file directly using Node's File System
const appJsonPath = path.resolve(__dirname, './app.json');
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const config = appJson.expo;

export default () => ({
  ...config,
  extra: {
    ...config.extra,
    posthogProjectToken: process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST,
    eas: {
      projectId: "a83bfb49-46c8-4d3d-8fc2-b7908372c90c"
    }
  }
});
