import React from 'react'
import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {screen, render, cleanup} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
// import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './App.jsx'
 
describe ('App', ()=>{
    beforeEach(()=>{
        render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
        )
    })
    afterEach(()=>{
        cleanup()
    })

    it('renders the header', ()=>{
        const header = screen.getByRole('navigation')
        expect(header).toBeInTheDocument()
    })
    it('goes to homepage automatically', ()=>{
        const homePageText= screen.getByText(/Welcome to Pokrastémon Adventures, a Pokémon themed procrastination app!/i)
        expect(homePageText).toBeInTheDocument()
    })
    // it('navigates to login page', async () => {
    //     const loginLink = screen.getByRole('link', { name: /Login/i });
    //     // console.log('loginLink:', loginLink);

    //     const emailLabelBeforeClick = screen.queryByRole('label', { name: /emailIn/i });
    //     // console.log('emailLabelBeforeClick:', emailLabelBeforeClick);

    //     await userEvent.click(loginLink);

    //     const emailLabelAfterClick = await screen.findByRole('label', { name: /emailIn/i });
    //     // console.log('emailLabelAfterClick:', emailLabelAfterClick);

    //     expect(emailLabelAfterClick).toBeInTheDocument();
    // });
})
