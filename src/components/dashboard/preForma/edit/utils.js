"use client"
export const calculateTotalValue = (orderItems) => {
    return orderItems.reduce((total, item) => {
      const quantity = parseInt(item.quantity, 10);
      const numberInPack = parseInt(item.number_in_pack, 10);
      return total + (quantity * numberInPack);
    }, 0);
  };
  