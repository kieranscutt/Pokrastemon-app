import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginForm from ".";
import { setupServer } from 'msw/node'
import { graphql, rest } from 'msw'


describe('LoginForm', ()=>{
    beforeEach(()=>{
        render(<LoginForm/>)
    })

    afterEach(()=>{
        cleanup()
    })

    it("should load the form correctly", () => {
        const formDiv = screen.getByTestId("formContainer")
        const h2 = screen.getByText("Login")
        const form = screen.getByTestId("loginForm")
        const userLabel = screen.getByText("Username:")
        const passLabel = screen.getByText("Password:")
        const inputU = screen.getByRole('textbox', {type: /username/})
        const inputP = screen.getByRole('textbox', {type: /password/})

        expect(formDiv).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(form).toBeInTheDocument()
        expect(userLabel).toBeInTheDocument()
        expect(passLabel).toBeInTheDocument()
        expect(inputU).toBeInTheDocument()
        expect(inputP).toBeInTheDocument()
    })

    it("should handle submit", async () => {

    })


})
