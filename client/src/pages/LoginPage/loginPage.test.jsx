import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
import { createContext } from "react";
expect.extend(matchers);
import LoginPage from "../Loginpage/index.jsx";
import { useState } from "react";
import { AuthContext } from "../../contexts/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../../App.jsx";

describe("Login Page", () => {

    beforeEach( async () => {
        render(
        <Router>
        <App />
        </Router>
        )
        const logIn = screen.getByRole('button', {name: "Log In"})
        await userEvent.click(logIn)
    })

    afterEach(() => {
        cleanup()
    })

    it("should render login page", async () => {
        const formDiv = screen.getByTestId("formContainer")
        const h2 = screen.getByText("Login")
        const form = screen.getByTestId("loginForm")
        const inputU = screen.getByRole('textbox', {type: /username/})
        const inputP = screen.getByRole('textbox', {type: /password/})
        const button1 = screen.getByTestId("logInLogIn")
        const button2 = screen.getByRole('button', {name: "Don't have an account? Register here."})

        expect(formDiv).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(form).toBeInTheDocument()
        expect(inputU).toBeInTheDocument()
        expect(inputP).toBeInTheDocument()
        expect(button1).toBeInTheDocument()
        expect(button2).toBeInTheDocument()
    })

    it("should handle submit", async () => {
        const inputU = screen.getByRole('textbox', {type: /username/})
        const inputP = screen.getByRole('textbox', {type: /password/})
        await userEvent.type(inputU, "glime")
        await userEvent.type(inputP, "glime")
        const button = screen.getByTestId("logInLogIn")
        await userEvent.click(button)
        // await new Promise((r) => setTimeout(r, 3000));
        // const studyDiv = screen.getByTestId("studypage")
        // expect(studyDiv).toBeInTheDocument()
    })

    it("should switch forms", async () => {
        const button = screen.getByRole('button', {name: "Don't have an account? Register here."})
        expect(screen.queryByTestId("username")).not.toBeInTheDocument()
        await userEvent.click(button)
        expect(screen.getByTestId("username")).toBeInTheDocument()
    })

    it("should render the register page correctly", async () => {
        const switchButton = screen.getByRole('button', {name: "Don't have an account? Register here."})
        await userEvent.click(switchButton)
        const formDiv = screen.getByTestId("formContainer")
        const h2 = screen.getByRole("heading")
        const form = screen.getByTestId("loginForm")
        const inputU = screen.getByTestId("username")
        const inputP = screen.getByTestId("password")
        const inputF = screen.getByTestId("firstName")
        const inputL = screen.getByTestId("lastName")
        const button1 = screen.getByRole('button', {name: /Register/i})
        const button2 = screen.getByRole('button', {name: "Have an account? Log in here."})

        expect(formDiv).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(form).toBeInTheDocument()
        expect(inputU).toBeInTheDocument()
        expect(inputP).toBeInTheDocument()
        expect(inputF).toBeInTheDocument()
        expect(inputL).toBeInTheDocument()
        expect(button1).toBeInTheDocument()
        expect(button2).toBeInTheDocument()
    })

    it("should handle submit", async () => {
        const switchButton = screen.getByRole('button', {name: "Don't have an account? Register here."})
        await userEvent.click(switchButton)
        const inputU = screen.getByTestId("username")
        const inputP = screen.getByTestId("password")
        const inputF = screen.getByTestId("firstName")
        const inputL = screen.getByTestId("lastName")
        await userEvent.type(inputU, "cheese")
        await userEvent.type(inputP, "burger")
        await userEvent.type(inputF, "cheese")
        await userEvent.type(inputL, "burger")
        const button = screen.getByRole('button', {name: /Register/i})
        await userEvent.click(button)
    })

    it("should switch forms again", async () => {
        const switchButton = screen.getByRole('button', {name: "Don't have an account? Register here."})
        await userEvent.click(switchButton)
        const button = screen.getByRole('button', {name: "Have an account? Log in here."})
        expect(screen.getByTestId("username")).toBeInTheDocument()
        await userEvent.click(button)
        expect(screen.queryByTestId("username")).not.toBeInTheDocument()
    })
})