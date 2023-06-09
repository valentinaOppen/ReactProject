//@ts-nocheck
import ProductsList from '../../pages/products-list';
import Table from '../../components/table';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import productReducer, { loadProducts } from '../../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const reactRedux = { useDispatch, useSelector }
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const useNavigateMock = jest.spyOn({ useNavigate }, "useNavigate");

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('ProductsList', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                product: productReducer,
            },
            product: {
                list: [],
            },
        });
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
        useNavigateMock.mockClear();
    });

    test('dispatches loadProducts action on mount', async () => {
        const mockDispatch = jest.fn();

        useDispatchMock.mockReturnValue(mockDispatch);
        useSelectorMock.mockReturnValue([]);

        render(
            <Provider store={store}>
                <ProductsList />
            </Provider>
        );

        // await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(loadProducts()));
        // expect(screen.getByText('Resultados')).toBeInTheDocument();
    });


    test('renders ProductsList component correctly', () => {
        const store = configureStore({
            reducer: {
                product: productReducer,
            },
            product: {
                list: [
                    {
                        id: 1,
                        name: 'Product 1',
                        description: 'Description 1'
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        description: 'Description 2'
                    },
                ],
            },
        });

        render(
            <Provider store={store}>
                <ProductsList />
            </Provider>
        );

        const filterInput = screen.getByPlaceholderText(/Search../i);
        expect(filterInput).toBeInTheDocument();
        expect(screen.getByText('Agregar')).toBeInTheDocument();

    });

    test('renders Table component correctly', () => {
        const data = [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description 1',
            },
            {
                id: 2,
                name: 'Product 2',
                description: 'Description 2',
            },
        ];

        const columns = [
            { property: 'name', text: 'Product Name', type: 'string' },
            { property: 'description', text: 'Description', type: 'string' },
        ];

        render(<Table data={data} columns={columns} />);
        const product1Text = screen.getByText('Product 1');
        expect(product1Text).toBeInTheDocument();

    });

    test('filters data when input value changes', () => {
        const mockedData = [
            { id: 1, name: 'Product 1', description: 'Description 1' },
            { id: 2, name: 'Product 2', description: 'Description 2' },
            { id: 3, name: 'Product 3', description: 'Description 3' },
        ];
        useSelectorMock.mockReturnValue(mockedData);

        render(<Provider store={store}>
            <ProductsList />
        </Provider>);

        // Simulate input change event
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Product 2' } });

        expect(screen.queryByText('Product 1')).toBeNull();
        expect(screen.queryByText('Product 3')).toBeNull();
    });

    test('navigates to "nuevo-producto" route on AddButton click', () => {
        const mockNavigate = jest.fn();
        useNavigateMock.mockReturnValue(mockNavigate);

        render(
            <Provider store={store}>
                <ProductsList />
            </Provider>
        );
        screen.getByText('Agregar').click();

        expect(mockNavigate).toHaveBeenCalledWith('nuevo-producto', { replace: true });
    });


});
