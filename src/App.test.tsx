import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import AppointmentType from './components/AppointmentType/AppointmentType';

  it('Loads new elements from resolved times', () => {
    const { getByTestId } = render(<AppointmentType selectType={() => undefined} />)

    screen.debug()
  })
