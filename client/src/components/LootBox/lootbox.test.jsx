import React from 'react';
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import LootBox from '.';

describe('lootbox', () => {
    beforeEach(() => {
        render(<LootBox />)
    })

    afterEach(() => {
        cleanup()
    })

    it('renders the lootbox', () => {
        const divLoot = screen.getByTestId("lootBox")
        const divChest = screen.getByTestId("chest")
        const divBgKey = screen.getByTestId("chestBGkeyhole")
        const divKey = screen.getByTestId("chestKeyhole")
        const text = screen.getByText("A LootBox! need 3 keys to open")

        expect(divLoot).toBeInTheDocument()
        expect(divChest).toBeInTheDocument()
        expect(divBgKey).toBeInTheDocument()
        expect(divKey).toBeInTheDocument()
        expect(text).toBeInTheDocument()
        expect(text.textContent).toBe("A LootBox! need 3 keys to open")
    })

})