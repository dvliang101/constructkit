import { configure } from '@storybook/react';

const req = require.context('../packages/', true, /\__stories__\/.*.js$/);
const loadStories = () => req.keys().forEach(module => req(module));

configure(loadStories, module);
