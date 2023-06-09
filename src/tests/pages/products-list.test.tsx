//@ts-nocheck
import ProductsList from '../../pages/products-list';
import Table from '../../components/table';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import productReducer, { loadProducts } from '../../store/productSlice';

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
        });
    });

    // test('renders ProductsList component', async () => {
    //     store.dispatch(loadProducts());
    // });

    // test('dispatches loadProducts action on mount', () => {
    //     store.dispatch(loadProducts());

    //     render(
    //         <Provider store={store}>
    //             <ProductsList />
    //         </Provider>
    //     );

    //     // Verifica que la acción de loadProducts haya sido despachada
    //     expect(store.getActions()).toContainEqual(loadProducts());
    // });

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

    // test('navigates to "nuevo-producto" route on AddButton click', () => {
    //     const mockNavigate = jest.fn();
    //     useNavigate.mockReturnValue(mockNavigate);

    //     const store = mockStore({
    //         product: {
    //             list: [],
    //         },
    //     });

    //     render(
    //         <Provider store={store}>
    //             <ProductsList />
    //         </Provider>
    //     );
    //     screen.getByText('Add').click();

    //     expect(mockNavigate).toHaveBeenCalledWith('nuevo-producto', { replace: true });
    // });


});
