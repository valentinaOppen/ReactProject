//@ts-nocheck

import React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ProductsForm from '../../pages/products-form';
import productReducer, { loadProducts } from '../../store/productSlice';

// Mock del store de Redux
const mockStore = configureStore({
    reducer: {
        product: productReducer,
    },
    product: {
        error: null,
        productSelected: {
            product: {
                id: 1,
                name: 'Product Name',
                description: 'Product Description',
                logo: 'product_logo.png',
                date_release: '2023-01-01',
                date_revision: '2023-01-02',
            },
        },
        delete: false
    },
});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


describe('Products Form', () => {

    let store;

    beforeEach(() => store = configureStore({
        reducer: {
            product: productReducer,
        },
        product: {
            error: null,
            productSelected: {
                product: {
                    id: 1,
                    name: 'Product Name',
                    description: 'Product Description',
                    logo: 'product_logo.png',
                    date_release: '2023-01-01',
                    date_revision: '2023-01-02',
                },
            },
            delete: false
        }
    }));


    test('renders ProductsForm component', () => {
        render(
            <Provider store={mockStore}>
                <ProductsForm />
            </Provider>
        );

        expect(screen.getByText('Formulario de registro')).toBeInTheDocument();
        expect(screen.getByLabelText('ID')).toBeInTheDocument();
        expect(screen.getByTestId('Nombre')).toBeInTheDocument();
        expect(screen.getByTestId('Descripcion')).toBeInTheDocument();
        expect(screen.getByTestId('Logo')).toBeInTheDocument();
        expect(screen.getByTestId('FechaLiberacion')).toBeInTheDocument();
        expect(screen.getByTestId('FechaRevision')).toBeInTheDocument();
        expect(screen.getByTestId('btn-enviar', { name: 'Enviar' })).toBeInTheDocument();
    });

    test('submits form data on submit button click', () => {
        render(
            <Provider store={mockStore}>
                <ProductsForm />
            </Provider>
        );

        fireEvent.change(screen.getByTestId('ID'), { target: { value: '123' } });
        fireEvent.change(screen.getByTestId('Nombre'), { target: { value: 'Product Name' } });
        fireEvent.change(screen.getByTestId('Descripcion'), { target: { value: 'Product Description' } });
        fireEvent.change(screen.getByTestId('Logo'), { target: { value: 'product_logo.png' } });
        fireEvent.change(screen.getByTestId('FechaLiberacion'), { target: { value: '2023-01-01' } });
        fireEvent.change(screen.getByTestId('FechaRevision'), { target: { value: '2023-01-02' } });

        fireEvent.click(screen.getByTestId('btn-enviar', { name: 'Enviar' }));
    });

});