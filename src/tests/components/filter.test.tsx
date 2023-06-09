import { fireEvent, render, screen } from '@testing-library/react';
import Filter from '../../components/filter';

describe('filter component', () => {
    it('renders without errors', () => {
        render(<Filter onChange={() => { }} />);
    });
    it('calls onChange function when input value changes', () => {
        const onChangeMock = jest.fn();
        const { getByPlaceholderText } = render(<Filter onChange={onChangeMock} />);
        const input = getByPlaceholderText('Search..');

        const expectedValue = 'example';

        fireEvent.change(input, { target: { value: expectedValue } });

        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledWith(expectedValue);
    });
})