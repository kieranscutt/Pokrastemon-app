import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import StudyPage from '../../pages/StudyPage';
import SettingsModal from '.';
import userEvent  from '@testing-library/user-event';

const useStateMock = (initial) => [initial, () => {}];

Object.defineProperty(React, 'useState', {
  value: useStateMock,
});

describe('StudyPage has settings configure button', () => {
  beforeEach(() => {
    render(<StudyPage />);
  });

  afterEach(() => {
    cleanup();
  });

  it('when button is clicked settings show up on screen', async () => {
    const settingsButton = screen.getByTestId('settings-button');
    expect(settingsButton).toBeInTheDocument();

    
  });
});



describe('SettingsModal Tests', () => {
    afterEach(()=>{
        cleanup()
    })

  it('does not show the pomodoro configure when first rendered', () => {
    render(<SettingsModal handleClose={() => {}} show={false} />);
    const formSettings = screen.getByTestId('settingsModalTest')
    expect(formSettings).toHaveClass('settings-modal display-none')

  });

  it('shows the pomodoro configure when show prop is true', async() => {
    render(<SettingsModal handleClose={() => {}} show={true} />);
    const formSettings = screen.getAllByTestId('settingsModalTest')
    expect(formSettings[0]).toHaveClass('settings-modal display-block')
  });

  it('should close the configure pomodoro settings when page is clicked', async()=>{
    const hideModal = vi.spyOn(vi, 'fn')
    hideModal.mockReturnValueOnce()
    
    render(<SettingsModal handleClose={hideModal} show={true} />);
    const formSettings = screen.getAllByTestId('settingsModalTest')
    expect(formSettings[0]).toHavgit Class('settings-modal display-block')
    
    const closeButton = screen.getByRole('button', {name: /close/i})
    expect(closeButton).toBeInTheDocument()

    await userEvent.click(closeButton)

    expect(hideModal).toHaveBeenCalled()

    const formSettingsAfterClose = screen.getByTestId('settingsModalTest')
    expect(formSettingsAfterClose).toHaveClass('settings-modal display-none')  
    })
});
