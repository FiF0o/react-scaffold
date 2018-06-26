import { configure, setAddon, addDecorator } from '@storybook/react';
import addWithInfo from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
// import { setOptions } from '@storybook/addon-options';



const req = require.context('../src/components', true, /\.stories\.js$/)

// TODO Set up Storybook options
// setOptions({});

setAddon(addWithInfo);
addDecorator(withKnobs);


function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
