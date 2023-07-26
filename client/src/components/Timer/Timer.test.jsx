import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest } from "vitest";
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Timer from ".";

/** 
 * Need to test to see if buttons render
 * To see if Display renders
 * To see if Display ticks down correctly 
 * To see Start timer and Pause buttons work
 * See if pressing pause works
 */

describe('Timer', ()=>{
    beforeEach(()=>{
        render(<Timer/>)
    })

    afterEach(()=>{
        cleanup()
    })

    it('header showing timer', ()=>{
        const head= screen.getByRole('heading')
        expect(head.textContent).toEqual('Timer')
    })

    it('shows buttons', ()=>{
        const startTimer = screen.getByRole('button', {name: /Start Timer/i})
        const pauseTimer = screen.getByRole('button', {name: /Pause/i})
        expect(startTimer).toBeInTheDocument()
        expect(pauseTimer).toBeInTheDocument()
    })
    

    it('show a timer', ()=>{
        const timer= screen.getAllByRole('timer', {name: /Timer display/i})
        console.log(timer)
        expect(timer).toBeInTheDocument()
    })
})
