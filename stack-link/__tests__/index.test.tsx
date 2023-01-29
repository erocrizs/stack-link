import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe("Home", () => {
  it("renders", () => {
    render(<Home />);

    const home = screen.getByTestId("Body");

    expect(home).toBeInTheDocument();
  })
})
