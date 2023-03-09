import { render } from '@testing-library/react';

import WidgetReact from './widget-react';

describe('WidgetReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WidgetReact />);
    expect(baseElement).toBeTruthy();
  });
});
