import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import userEvent from '@testing-library/user-event';

import SettingsForm from '.';

describe('StudyPage has settings configure button', () => {
  beforeEach(() => {
    render(
      <SettingsForm/>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('render the settings header', ()=>{
    const settingsHeader = screen.getByRole('heading', {name: /Pomodoro Settings/i})
    expect(settingsHeader).toBeInTheDocument()
  })
  it('can select numbers from the drop down menu', ()=>{

  })
  

})
