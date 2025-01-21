import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeCar } from '../store'
import { createSelector } from '@reduxjs/toolkit';

const memoizedCars = createSelector(
  [(state) => state.car.cars, (state) => state.car.searchTerm],
  (cars, searchTerm) =>
    cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

export const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(memoizedCars);
  const handleCarDelete = (car) => dispatch(removeCar(car.id));

  const renderedCars = cars.map((car) => {
    return (
      <div key={car.id} className='panel'>
        <p>{car.name} - {car.cost}</p>
        <button className='button is-danger' onClick={() => handleCarDelete(car)}> Delete</button >
      </div>
    )
  })

  return (
    <div className='car-list'>
      {renderedCars}
      <hr />
    </div>
  )
}
