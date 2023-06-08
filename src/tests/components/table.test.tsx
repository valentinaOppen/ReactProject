//@ts-nocheck

import { render, fireEvent } from '@testing-library/react';
import Table from '../../components/table';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

describe('Table component', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});

    const mockColumns = [
        { text: 'Column 1', icon: 'icon1.png', iconClass: 'icon-class', property: 'property1', type: 'text' },
        { text: 'Column 2', icon: 'icon2.png', iconClass: 'icon-class', property: 'property2', type: 'date' },
        { property: '', options: ['Editar', 'Eliminar'], type: 'menu' }
    ];

    const mockData = [
        { id: 1, property1: 'Value 1', property2: '2023-01-01' },
        { id: 2, property1: 'Value 2', property2: '2023-02-02' },
    ];

    it('renders without errors', () => {
        render(<Provider store={store}>
            <Table data={mockData} columns={mockColumns} />
        </Provider>);
    });

    it('displays the correct column text', () => {
        const { getByText } = render(<Table data={mockData} columns={mockColumns} />);
        const column1Text = getByText('Column 1');
        const column2Text = getByText('Column 2');

        expect(column1Text).toBeInTheDocument();
        expect(column2Text).toBeInTheDocument();
    });

    it('handles menu activation correctly', () => {
        const { getAllByTestId } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Table data={mockData} columns={mockColumns} />
                </MemoryRouter>
            </Provider>);

        const menuButtons = getAllByTestId('menu-button');

        fireEvent.click(menuButtons[0]); // Activate menu for the first row
        expect(menuButtons[0]).toHaveClass('active');

        fireEvent.click(menuButtons[0]); // Deactivate menu for the first row
        expect(menuButtons[0]).not.toHaveClass('active');

        fireEvent.click(menuButtons[1]); // Activate menu for the second row
        expect(menuButtons[1]).toHaveClass('active');
    });
});
