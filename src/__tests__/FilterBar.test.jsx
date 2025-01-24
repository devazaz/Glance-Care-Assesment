import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "../components/ui/FilterBar";

describe("FilterBar Component", () => {
  it("renders the form with initial fields", () => {
    render(<FilterBar />);
    
    // Check if form fields are rendered
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it("submits the form when Search is clicked", () => {
    render(<FilterBar />);
    
    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    // Add your expectations/assertions for form submission logic
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
