import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { text, select, boolean } from "@storybook/addon-knobs/react";
import { withNotes } from '@storybook/addon-notes';


const Button = ({label, disa, dropdown}) => <button>{label} - {`${disa}`} - {dropdown}</button>


storiesOf('Button', module)
  .add('with text', () =>
    <Button
      dropdown={select('options', ['foo', 'bar'], 'foo', 'dropdown')}
      disa={boolean('disabled', false)}
      label={text('label', 'my label')}
    />
  );
