import * as React from 'react';
import * as renderer from 'react-test-renderer';
import App from './App';

describe('<App />', () => {
  it('renders', () => {

    const component = renderer.create(
      <App questions={[]} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});