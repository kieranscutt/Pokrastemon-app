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

//console.log(userEvent)
window.alert = () => {};

describe("study page", () => {

    beforeEach(async () => {
        render(
            <Router>
            <App />
            </Router>
            )
            const study = screen.getByRole('button', {name: "Study"})
            await userEvent.click(study)
    })

    afterEach(() => {
        cleanup()
    })

    it("should load the page divs correctly", () => {
        const studyDiv = screen.getByTestId("studypage")
        const pomodoro = screen.getByTestId("pomodoro-timer")
        const todo = screen.getByTestId("todo overall")

        expect(studyDiv).toBeInTheDocument()
        expect(pomodoro).toBeInTheDocument()
        expect(todo).toBeInTheDocument()
    })

    it("should load a timer", () => {
        const timer = screen.getByTestId("timer")
        expect(timer).toBeInTheDocument()
    })

    it("should load a lootbox", () => {
        const lootBox = screen.getByTestId("lootBox")
        expect(lootBox).toBeInTheDocument()
    })

    it("should load a settings bit", () => {
        const settingsModal = screen.getByTestId("settings")
        const settingsButton = screen.getByTestId("settings-button")
        expect(settingsModal).toBeInTheDocument()
        expect(settingsButton).toBeInTheDocument()
    })

    it("should load a todo form", () => {
        const todo = screen.getByTestId("todo start")
        expect(todo).toBeInTheDocument()
    })

    describe("timer", () => {

        it("should load the timer correctly", () => {
            const timerDisplay = screen.getByTestId("timerDiv")
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const pauseButton = screen.getByRole('button', {name: "Pause"})

            expect(timerDisplay).toBeInTheDocument()
            expect(startButton).toBeInTheDocument()
            expect(pauseButton).toBeInTheDocument()
        })

        it("should start the timer", async () => {
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            expect(secondsCounter.textContent).toBe("00: 20: 00")
            await userEvent.click(startButton)
            expect(secondsCounter.textContent).toBe('0: 0: 30')
            await new Promise((r) => setTimeout(r, 1000));
            expect(secondsCounter.textContent).toBe('0: 0: 29')
        })

        it("should pause the timer", async () => {
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            const pauseButton = screen.getByRole('button', {name: "Pause"})
            await userEvent.click(startButton)
            const num = secondsCounter.textContent
            await userEvent.click(pauseButton)
            await new Promise((r) => setTimeout(r, 1000));
            expect(secondsCounter.textContent).toBe(num)

        })
    })

    describe("lootbox", () => {
        it('renders the lootbox', () => {
            const divLoot = screen.getByTestId("lootBox")
            const divChest = screen.getByTestId("chest")
            const text = screen.getByText("A LootBox! need 3 keys to open")
    
            expect(divLoot).toBeInTheDocument()
            expect(divChest).toBeInTheDocument()
            expect(text).toBeInTheDocument()
            expect(text.textContent).toBe("A LootBox! need 3 keys to open")
        })
    })

    describe("settings", () => {

        it("should render the settings form correctly", () => {
            const settingsForm = screen.getByTestId("settingsForm")
            const modalMain = screen.getByTestId("modalMain")
            expect(settingsForm).toBeInTheDocument()
            expect(modalMain).toBeInTheDocument()
        })

        it("should appear when the user clicks the button", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            const settingsModal = screen.getByTestId("settings")
            expect(settingsModal).toHaveClass("settings-modal display-none")
            await userEvent.click(settingsButton)
            expect(settingsModal).toHaveClass("settings-modal display-block")
        })

        it("should appear correctly", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            await userEvent.click(settingsButton)
            const pomodoroTitle = screen.getByTestId("pomodoroTitle")
            const pomodoroForm = screen.getByTestId("pomodoroForm")
            const block_num = screen.getByTestId("block_num")
            const block_mins = screen.getByTestId("block_mins")
            const long_break_mins = screen.getByTestId("long_break_mins")
            const short_break_mins = screen.getByTestId("short_break_mins")
            const saveButton = screen.getByTestId("save")
            const closeButton = screen.getByTestId("close")
            expect(saveButton).toBeInTheDocument()
            expect(closeButton).toBeInTheDocument()
            expect(pomodoroTitle).toBeInTheDocument()
            expect(pomodoroForm).toBeInTheDocument()
            expect(block_mins).toBeInTheDocument()
            expect(block_num).toBeInTheDocument()
            expect(long_break_mins).toBeInTheDocument()
            expect(short_break_mins).toBeInTheDocument()
        })

        it("should handle change", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            await userEvent.click(settingsButton)
            const block_num = screen.getByTestId("block_num")
            const block_mins = screen.getByTestId("block_mins")
            const long_break_mins = screen.getByTestId("long_break_mins")
            const short_break_mins = screen.getByTestId("short_break_mins")
            expect(block_mins.value).toBe("20")
            expect(block_num.value).toBe("4")
            expect(long_break_mins.value).toBe("15")
            expect(short_break_mins.value).toBe("5")
            await userEvent.selectOptions(block_mins, "10")
            await userEvent.selectOptions(block_num, "10")
            await userEvent.selectOptions(long_break_mins, "10")
            await userEvent.selectOptions(short_break_mins, "10")
            const saveButton = screen.getByTestId("save")
            await userEvent.click(saveButton)
            expect(block_mins.value).toBe("10")
            expect(block_num.value).toBe("10")
            expect(long_break_mins.value).toBe("10")
            expect(short_break_mins.value).toBe("10")
        })

        it("should close when close button clicked", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            const closeButton = screen.getByTestId("close")
            await userEvent.click(settingsButton)
            const settingsModal = screen.getByTestId("settings")
            expect(settingsModal).toHaveClass("settings-modal display-block")
            await userEvent.click(closeButton)
            expect(settingsModal).toHaveClass("settings-modal display-none")
        })
    })

    describe("todo test", () => {
        it("should load todo list", () => {
            const todoForm = screen.getByTestId("todoForm")
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            const todoContainer = screen.getByTestId("todoContainer")
            const todoList = screen.getByTestId("todoList")

            expect(todoForm).toBeInTheDocument()
            expect(todoList).toBeInTheDocument()
            expect(todoContainer).toBeInTheDocument()
            expect(todoButton).toBeInTheDocument()
            expect(todoInput).toBeInTheDocument()
        })

        it("should add a todo and the todo should display correctly", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            expect(screen.queryByTestId("todoItem")).not.toBeInTheDocument()
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const todoItem = screen.getByTestId("todoItem")
            expect(todoItem).toBeInTheDocument()
            const todoSpan = screen.getByTestId("todoSpan")
            const deleteButton = screen.getByTestId("todoDelete")
            const completeButton = screen.getByTestId("todoComplete")
            expect(todoSpan).toBeInTheDocument()
            expect(deleteButton).toBeInTheDocument()
            expect(completeButton).toBeInTheDocument()
        })

        it("should complete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const completeButton = screen.getByTestId("todoComplete")
            const todoSpan = screen.getByTestId("todoSpan")
            expect(todoSpan).toHaveClass("todo-item")
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item completed")
        })

        it("should uncomplete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            await userEvent.type(todoInput, "burger")
            await userEvent.click(todoButton)
            const completeButton = screen.getAllByTestId("todoComplete")[0]
            const todoSpan = screen.getAllByTestId("todoSpan")[0]
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item completed")
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item")
        })

        it("should delete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const deleteButton = screen.getByTestId("todoDelete")
            expect(screen.getByTestId("todoItem")).toBeInTheDocument()
            await userEvent.click(deleteButton)
            expect(screen.queryByTestId("todoItem")).not.toBeInTheDocument()
        })
    })
})

describe("study page with tokens", () => {
    beforeEach(async () => {
        render(
            <Router>
            <MockAuthProvider>
              <KeysProvider>
                <SettingsProvider>
                  <PokemonProvider>
                  <Routes>
        <Route path="/study" element={<StudyPage />} />
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

    it("should load the page divs correctly", () => {
        const studyDiv = screen.getByTestId("studypage")
        const pomodoro = screen.getByTestId("pomodoro-timer")
        const todo = screen.getByTestId("todo overall")

        expect(studyDiv).toBeInTheDocument()
        expect(pomodoro).toBeInTheDocument()
        expect(todo).toBeInTheDocument()
    })

    it("should load a timer", () => {
        const timer = screen.getByTestId("timer")
        expect(timer).toBeInTheDocument()
    })

    it("should load a lootbox", () => {
        const lootBox = screen.getByTestId("lootBox")
        expect(lootBox).toBeInTheDocument()
    })

    it("should load a settings bit", () => {
        const settingsModal = screen.getByTestId("settings")
        const settingsButton = screen.getByTestId("settings-button")
        expect(settingsModal).toBeInTheDocument()
        expect(settingsButton).toBeInTheDocument()
    })

    it("should load a todo form", () => {
        const todo = screen.getByTestId("todo start")
        expect(todo).toBeInTheDocument()
    })

    describe("timer", () => {

        it("should load the timer correctly", () => {
            const timerDisplay = screen.getByTestId("timerDiv")
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const pauseButton = screen.getByRole('button', {name: "Pause"})

            expect(timerDisplay).toBeInTheDocument()
            expect(startButton).toBeInTheDocument()
            expect(pauseButton).toBeInTheDocument()
        })

        it("should start the timer", async () => {
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            expect(secondsCounter.textContent).toBe("00: 20: 00")
            await userEvent.click(startButton)
            expect(secondsCounter.textContent).toBe('0: 20: 0')
            await new Promise((r) => setTimeout(r, 1000));
            expect(secondsCounter.textContent).toBe('0: 19: 59')
        })

        it("should decrement hours", async() => {
            const settingsButton = screen.getByTestId("settings-button")
            await userEvent.click(settingsButton)
            const block_mins = screen.getByTestId("block_mins")
            await userEvent.selectOptions(block_mins, "60")
            const saveButton = screen.getByTestId("save")
            await userEvent.click(saveButton)
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            await userEvent.click(startButton)
            expect(secondsCounter.textContent).toBe("1: 0: 0")
            await new Promise((r) => setTimeout(r, 1000));
            expect(secondsCounter.textContent).toBe('0: 59: 59')
        })

        it("should add a key", async () => {
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            await new Promise((r) => setTimeout(r, 15000));
        }, 20000)

        it("should pause the timer", async () => {
            const startButton = screen.getByRole('button', {name : "Start Timer"})
            const secondsCounter = screen.getByTestId("seconds")
            const pauseButton = screen.getByRole('button', {name: "Pause"})
            await userEvent.click(startButton)
            const num = secondsCounter.textContent
            await userEvent.click(pauseButton)
            await new Promise((r) => setTimeout(r, 1000));
            expect(secondsCounter.textContent).toBe(num)

        })
    })

    describe("lootbox", () => {
        it('renders the lootbox', () => {
            const divLoot = screen.getByTestId("lootBox")
            const divChest = screen.getByTestId("chest")
            const text = screen.getByText("A LootBox! need 3 keys to open")
    
            expect(divLoot).toBeInTheDocument()
            expect(divChest).toBeInTheDocument()
            expect(text).toBeInTheDocument()
            expect(text.textContent).toBe("A LootBox! need 3 keys to open")
        })
    })

    describe("settings", () => {

        it("should render the settings form correctly", () => {
            const settingsForm = screen.getByTestId("settingsForm")
            const modalMain = screen.getByTestId("modalMain")
            expect(settingsForm).toBeInTheDocument()
            expect(modalMain).toBeInTheDocument()
        })

        it("should appear when the user clicks the button", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            const settingsModal = screen.getByTestId("settings")
            expect(settingsModal).toHaveClass("settings-modal display-none")
            await userEvent.click(settingsButton)
            expect(settingsModal).toHaveClass("settings-modal display-block")
        })

        it("should appear correctly", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            await userEvent.click(settingsButton)
            const pomodoroTitle = screen.getByTestId("pomodoroTitle")
            const pomodoroForm = screen.getByTestId("pomodoroForm")
            const block_num = screen.getByTestId("block_num")
            const block_mins = screen.getByTestId("block_mins")
            const long_break_mins = screen.getByTestId("long_break_mins")
            const short_break_mins = screen.getByTestId("short_break_mins")
            const saveButton = screen.getByTestId("save")
            const closeButton = screen.getByTestId("close")
            expect(saveButton).toBeInTheDocument()
            expect(closeButton).toBeInTheDocument()
            expect(pomodoroTitle).toBeInTheDocument()
            expect(pomodoroForm).toBeInTheDocument()
            expect(block_mins).toBeInTheDocument()
            expect(block_num).toBeInTheDocument()
            expect(long_break_mins).toBeInTheDocument()
            expect(short_break_mins).toBeInTheDocument()
        })

        it("should handle change", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            await userEvent.click(settingsButton)
            const block_num = screen.getByTestId("block_num")
            const block_mins = screen.getByTestId("block_mins")
            const long_break_mins = screen.getByTestId("long_break_mins")
            const short_break_mins = screen.getByTestId("short_break_mins")
            expect(block_mins.value).toBe("20")
            expect(block_num.value).toBe("4")
            expect(long_break_mins.value).toBe("15")
            expect(short_break_mins.value).toBe("5")
            await userEvent.selectOptions(block_mins, "10")
            await userEvent.selectOptions(block_num, "10")
            await userEvent.selectOptions(long_break_mins, "10")
            await userEvent.selectOptions(short_break_mins, "10")
            const saveButton = screen.getByTestId("save")
            await userEvent.click(saveButton)
            expect(block_mins.value).toBe("10")
            expect(block_num.value).toBe("10")
            expect(long_break_mins.value).toBe("10")
            expect(short_break_mins.value).toBe("10")
        })

        it("should close when close button clicked", async () => {
            const settingsButton = screen.getByTestId("settings-button")
            const closeButton = screen.getByTestId("close")
            await userEvent.click(settingsButton)
            const settingsModal = screen.getByTestId("settings")
            expect(settingsModal).toHaveClass("settings-modal display-block")
            await userEvent.click(closeButton)
            expect(settingsModal).toHaveClass("settings-modal display-none")
        })
    })

    describe("todo test", () => {
        it("should load todo list", () => {
            const todoForm = screen.getByTestId("todoForm")
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            const todoContainer = screen.getByTestId("todoContainer")
            const todoList = screen.getByTestId("todoList")

            expect(todoForm).toBeInTheDocument()
            expect(todoList).toBeInTheDocument()
            expect(todoContainer).toBeInTheDocument()
            expect(todoButton).toBeInTheDocument()
            expect(todoInput).toBeInTheDocument()
        })

        it("should add a todo and the todo should display correctly", async () => {
            window.alert = () => {};
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            expect(screen.queryByTestId("todoItem")).not.toBeInTheDocument()
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const todoItem = screen.getByTestId("todoItem")
            expect(todoItem).toBeInTheDocument()
            const todoSpan = screen.getByTestId("todoSpan")
            const deleteButton = screen.getByTestId("todoDelete")
            const completeButton = screen.getByTestId("todoComplete")
            expect(todoSpan).toBeInTheDocument()
            expect(deleteButton).toBeInTheDocument()
            expect(completeButton).toBeInTheDocument()
        })

        it("should complete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const completeButton = screen.getByTestId("todoComplete")
            const todoSpan = screen.getByTestId("todoSpan")
            expect(todoSpan).toHaveClass("todo-item")
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item completed")
        })

        it("should uncomplete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            await userEvent.type(todoInput, "burger")
            await userEvent.click(todoButton)
            const completeButton = screen.getAllByTestId("todoComplete")[0]
            const todoSpan = screen.getAllByTestId("todoSpan")[0]
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item completed")
            await userEvent.click(completeButton)
            expect(todoSpan).toHaveClass("todo-item")
        })

        it("should delete a todo", async () => {
            const todoInput = screen.getByTestId("todoInput")
            const todoButton = screen.getByTestId("todoButton")
            await userEvent.type(todoInput, "cheese")
            await userEvent.click(todoButton)
            const deleteButton = screen.getByTestId("todoDelete")
            expect(screen.getByTestId("todoItem")).toBeInTheDocument()
            await userEvent.click(deleteButton)
            expect(screen.queryByTestId("todoItem")).not.toBeInTheDocument()
        })
    })
})