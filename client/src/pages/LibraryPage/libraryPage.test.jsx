import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { useState } from "react";
expect.extend(matchers);
import StudyPage from ".";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App";
import { MockAuthProvider, KeysProvider, SettingsProvider, PokemonProvider } from '../../contexts';
import { Routes, Route } from 'react-router-dom';
import LibraryPage from ".";


describe("Library Page without logging in", () => {

    beforeEach( async () => {
        render(
        <Router>
        <App />
        </Router>
        )
        const logIn = screen.getByRole('button', {name: "Library"})
        await userEvent.click(logIn)
    })

    afterEach(() => {
        cleanup()
    })

    it('render library page without pokemon', async ()=>{
        const h1 = screen.getByText('Welcome to Your Pokémon Library')
        const message = screen.getByTestId('notLoggedInMessage')

        expect(h1).toBeInTheDocument()
        expect(screen.queryByTestId('libraryGrid')).not.toBeInTheDocument()
        expect(message).toBeInTheDocument()

    })


})

describe('Library Page when logged in', ()=>{
    beforeEach(async () => {
        render(
            <Router>
            <MockAuthProvider>
              <KeysProvider>
                <SettingsProvider>
                  <PokemonProvider>
                  <Routes>
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
            </PokemonProvider>
            </SettingsProvider>
            </KeysProvider>
            </MockAuthProvider>  
            </Router>
          );
    })

    afterEach(() => {
        cleanup()
    })

    it('render library page with the pokemon grid div',()=>{
        const h1 = screen.getByText('Welcome to Your Pokémon Library')
        const div = screen.getByTestId("noPokemons")

        expect(h1).toBeInTheDocument()
        expect(div).toBeInTheDocument()

    })
})
