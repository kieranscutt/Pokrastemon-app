import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest } from "vitest";
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginForm from ".";

/** 
 * 
 */

describe('LoginForm', ()=>{
    beforeEach(()=>{
        render(<LoginForm/>)
    })

    afterEach(()=>{
        cleanup()
    })
    it('render form', ()=>{
        const loginForm = screen.getByRole('loginForm')
        expect(loginForm).toBeInTheDocument()
    })
    it('clicks register button and switches the form to the register form', async ()=>{
        const regButton = screen.getByRole('button', {name: /don't have an account/i})
        fireEvent.click(regButton)
        const regConfirm = await screen.findByRole('button', {name: /Register/i})
        console.log("Register Form Button", regConfirm)
        expect(regConfirm).toBeInTheDocument()
    } )
})
