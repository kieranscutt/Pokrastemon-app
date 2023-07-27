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
})
