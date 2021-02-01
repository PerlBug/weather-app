import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { mount, shallow } from 'enzyme';
import { ToastProvider } from 'react-toast-notifications';

it("renders without crashing", () => {
  shallow(<ToastProvider><App /></ToastProvider>);
});

//TODO - more test cases