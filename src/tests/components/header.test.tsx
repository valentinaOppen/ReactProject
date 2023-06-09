import { render } from '@testing-library/react';
import Header from '../../components/header';

describe('Header component', () => {
    it('renders without errors', () => {
        render(<Header />);
    });

    it('renders the logo image', () => {
        const { getByAltText } = render(<Header />);
        const logoImage = getByAltText('Logo');

        expect(logoImage).toBeInTheDocument();
        expect(logoImage.getAttribute('src')).toContain('logo.png');
    });
});