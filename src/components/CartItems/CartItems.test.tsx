import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItems from './CartItems';
import { CartItem } from 'models/CartItem';

jest.mock('utils/utils', () => ({
  formatAsPrice: jest.fn((value) => `$${value.toFixed(2)}`),
}));

jest.mock('components/AddProductToCart/AddProductToCart', () => () => <div data-testid="add-product-to-cart" />);

describe('CartItems', () => {
  const mockCartItems: CartItem[] = [
    {
      product: { id: '1', title: 'Product 1', description: 'Description 1', price: 10 },
      count: 2,
    },
    {
      product: { id: '2', title: 'Product 2', description: 'Description 2', price: 20 },
      count: 1,
    },
  ];

  it('renders cart items and calculates total price correctly', () => {
    render(<CartItems items={mockCartItems} isEditable={false} />);

    // Verify product details
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('$10.00 x 2 = $20.00')).toBeInTheDocument();

    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('$20.00 x 1 = $20.00')).toBeInTheDocument();

    // Verify total price
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$40.00')).toBeInTheDocument();

    // Verify shipping is "Free"
    expect(screen.getByText('Shipping')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders AddProductToCart component when isEditable is true', () => {
    render(<CartItems items={mockCartItems} isEditable={true} />);

    // Verify AddProductToCart is rendered for each item
    const addToCartComponents = screen.getAllByTestId('add-product-to-cart');
    expect(addToCartComponents).toHaveLength(mockCartItems.length);
  });

  it('does not render AddProductToCart component when isEditable is false', () => {
    render(<CartItems items={mockCartItems} isEditable={false} />);

    // Verify AddProductToCart is not rendered
    expect(screen.queryByTestId('add-product-to-cart')).not.toBeInTheDocument();
  });
});
