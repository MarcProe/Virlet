import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders Hello World message', () => {
    render(<Home />)
    
    expect(screen.getByText('Hello, World! 👋')).toBeInTheDocument()
    expect(screen.getByText('Virlet')).toBeInTheDocument()
    expect(screen.getByText('Instagram Creator Analytics & Management')).toBeInTheDocument()
  })

  it('renders the counter button', () => {
    render(<Home />)
    
    const button = screen.getByText(/Count: 0/)
    expect(button).toBeInTheDocument()
  })

  it('increments counter when button is clicked', () => {
    render(<Home />)
    
    const button = screen.getByText(/Count: 0/)
    fireEvent.click(button)
    
    expect(screen.getByText(/Count: 1/)).toBeInTheDocument()
  })

  it('has neumorphism page class', () => {
    render(<Home />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('neumorphism-page')
  })

  it('has neumorphism card', () => {
    render(<Home />)
    
    const card = screen.getByText('Hello, World! 👋').parentElement
    expect(card).toHaveClass('neumorphism-card')
  })

  it('has neumorphism button', () => {
    render(<Home />)
    
    const button = screen.getByText(/Count: 0/)
    expect(button).toHaveClass('neumorphism-btn')
  })
})
