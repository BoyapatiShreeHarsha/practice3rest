import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Page2 from './components/Page2/Page2';
import React from "react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Header/Header');
jest.mock('./components/Content/Content');
jest.mock('./components/Page2/Page2');


describe("Test the app.js for routing", () => {
    test("is app.js present", () => {

        Header.mockImplementation(() => <div>Header</div>);
        Content.mockImplementation(() => <div>Content</div>);
        render(<BrowserRouter><App /></BrowserRouter>);
        let contentEle = screen.getByText(/header/i);
        expect(contentEle).toBeInTheDocument();
        expect(screen.getByText(/content/i)).toBeInTheDocument();
    });

    test("checking for country", () => {
        Page2.mockImplementation(() => <div>Page2</div>)
        Header.mockImplementation(() => <div>Header</div>);
        Content.mockImplementation(() => <div>Content</div>);
        render(<MemoryRouter initialEntries={["/country"]}><App /></MemoryRouter>);
        let contentEle = screen.getByText(/header/i);
        expect(contentEle).toBeInTheDocument();
        expect(screen.getByText(/page2/i)).toBeInTheDocument();
    })
})

