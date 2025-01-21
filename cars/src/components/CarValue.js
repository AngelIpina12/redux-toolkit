import { createSelector } from '@reduxjs/toolkit';
import React from 'react'
import { useSelector } from 'react-redux'

export const CarValue = () => {
  const memoizedCost = createSelector([
    (state) => state.car.cars, (state) => state.car.searchTerm
  ], (cars, searchTerm) => {
    return cars
      .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc, car) => acc + car.cost, 0)
  });
  const totalCost = useSelector(memoizedCost);

  return (
    <div className='car-value'>
      Total Cost: ${totalCost}
    </div>
  )
}
