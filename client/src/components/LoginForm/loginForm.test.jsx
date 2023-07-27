import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginForm from ".";
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'
// src/setupTests.js
import { server } from '../../mocks/server.jsx'


describe('LoginForm', ()=>{
    // Establish API mocking before all tests.
    beforeAll(() => server.listen())
    
    // Clean up after the tests are finished.
    afterAll(() => server.close())

    beforeEach(()=>{
        render(<LoginForm/>)
    })

    // Reset any request handlers that we may add during the tests,
    // so they don't affect other tests.
    afterEach(()=>{
        server.resetHandlers()
        cleanup()
    })

    it("should load the page correctly", () => {
        const formDiv = screen.getByTestId("formContainer")
        const h2 = screen.getByText("Login")
        const form = screen.getByTestId("loginForm")
        const userLabel = screen.getByText("Username:")
        const passLabel = screen.getByText("Password:")
        const inputU = screen.getByRole('textbox', {type: /username/})
        const inputP = screen.getByRole('textbox', {type: /password/})
        const button1 = screen.getByRole('button', {name: /Log in/i})
        const button2 = screen.getByRole('button', {name: "Don't have an account? Register here."})

        expect(formDiv).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(form).toBeInTheDocument()
        expect(userLabel).toBeInTheDocument()
        expect(passLabel).toBeInTheDocument()
        expect(inputU).toBeInTheDocument()
        expect(inputP).toBeInTheDocument()
        expect(button1).toBeInTheDocument()
        expect(button2).toBeInTheDocument()
    })

    it("should handle submit", async () => {
        const inputU = screen.getByRole('textbox', {type: /username/})
        const inputP = screen.getByRole('textbox', {type: /password/})
        await userEvent.type(inputU, "cheese")
        await userEvent.type(inputP, "burger")
        const button = screen.getByRole('button', {name: /Log in/i})
        await userEvent.click(button)
    })


})
