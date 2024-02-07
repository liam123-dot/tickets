import React, { createContext, useContext, useState } from 'react';

const BasketContext = createContext();

export function useBasket() {
    return useContext(BasketContext);
}

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);

    const updateTicketQuantity = (ticketId, quantity, price) => {
        setBasket((current) => {
            const index = current.findIndex((item) => item.ticket_id === ticketId);
            if (index >= 0) {
                // Update existing ticket quantity
                const newBasket = [...current];
                newBasket[index] = { ...newBasket[index], quantity };
                return newBasket.filter(item => item.quantity > 0); // Remove items with 0 quantity
            } else if (quantity > 0) {
                // Add new ticket with quantity if not already in basket and quantity > 0
                return [...current, { ticket_id: ticketId, quantity, price}];
            }
            return current;
        });
    };

    const clearBasket = () => {
        setBasket([]);
    };

    return (
        <BasketContext.Provider value={{ basket, updateTicketQuantity, clearBasket }}>
            {children}
        </BasketContext.Provider>
    );
};

