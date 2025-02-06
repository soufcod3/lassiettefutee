import { render, screen } from '@testing-library/react'
import Navbar from '../components/shared/Navbar'
import '@testing-library/jest-dom';


test('renders navbar', () => {
  render(<Navbar />)
  expect(screen.getByText(/L'Assiette Futée/)).toBeInTheDocument()
})
