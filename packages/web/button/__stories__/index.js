import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../src';

storiesOf('Web Components', module)
  .add('Button', () => (<Button text="eric" />));
