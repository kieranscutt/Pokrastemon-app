import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);
import userEvent from '@testing-library/user-event';

import StudyPage from '../../pages/StudyPage';

describe('StudyPage has settings configure button', () => {
  beforeEach(() => {
    render(
      <StudyPage/>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('when button is clicked settings show up on screen', async ()=>{
    screen.debug()
    const settingsButton = screen.getByTestId('settings-button')
    expect(settingsButton).toBeInTheDocument()
    await expect(screen.getByRole('heading', {name: /Pomodoro Settings/i})).not.toBeVisible()
    // await userEvent.click(settingsButton)
    // expect(screen.queryByText('heading', {name: /Pomodoro Settings/i})).toBeInTheDocument()
  })
  

})
