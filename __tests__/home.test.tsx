import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders Hello World message', () => {
    render(<Home />)
    
    expect(screen.getByText('Hello, World! 👋')).toBeInTheDocument()
    expect(screen.getByText('Virlet')).toBeInTheDocument()
    expect(screen.getByText('Instagram Creator Analytics & Management')).toBeInTheDocument()
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

  it('has proper heading hierarchy', () => {
    render(<Home />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Virlet')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Hello, World! 👋')
  })

  it('has footer with copyright', () => {
    render(<Home />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Virlet. All rights reserved.`)).toBeInTheDocument()
  })
})
