import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Header from './index';

describe('header', () => {
    beforeEach(() => {
        render(
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        );
      });

    afterEach(() => {
      cleanup();
    });

    it("renders the home link", () => {
        const homeLink = screen.getByRole('link', {name: /home/i})
        expect(homeLink).toBeInTheDocument();
    })

    it("renders the study link", () => {
        const studyLink = screen.getByRole('link', {name: /study/i})
        expect(studyLink).toBeInTheDocument()
    })
})