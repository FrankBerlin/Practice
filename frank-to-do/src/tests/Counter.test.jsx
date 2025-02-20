import Counter from '../Counter';
import React from 'react';
import { render, screen } from "@testing-library/react";
import { expect, test } from 'vitest';
import "@testing-library/jest-dom/vitest";

test('Counter displays correct number of todos', async () => {
    const mockArray = [
        {text:"test", id: "1", done: false},
        {text:"test", id: "2", done: true}
    ];

    render(<Counter todos={mockArray} />);

    // check correct rendering
    screen.debug();

    const totalText = await screen.findByText(/Total:\s*2\s*\|\s*Open:\s*1/i);
    expect(totalText).toBeInTheDocument();
});