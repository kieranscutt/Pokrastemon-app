import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginPage from "../Loginpage/index.jsx";

describe("Login Page", () => {

    beforeEach(() => {
        render(<LoginPage/ >)
    })

    afterEach(() => {
        cleanup()
    })

    it("should render login page", async () => {
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
        const userLabel = screen.getByText("Username:")
        const passLabel = screen.getByText("Password:")
        const firstLabel = screen.getByText("First Name:")
        const lastLabel = screen.getByText("Last Name:")
        const inputU = screen.getByTestId("username")
        const inputP = screen.getByTestId("password")
        const inputF = screen.getByTestId("firstName")
        const inputL = screen.getByTestId("lastName")
        const button1 = screen.getByRole('button', {name: /Register/i})
        const button2 = screen.getByRole('button', {name: "Have an account? Log in here."})

        expect(formDiv).toBeInTheDocument()
        expect(h2).toBeInTheDocument()
        expect(form).toBeInTheDocument()
        expect(userLabel).toBeInTheDocument()
        expect(passLabel).toBeInTheDocument()
        expect(firstLabel).toBeInTheDocument()
        expect(lastLabel).toBeInTheDocument()
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