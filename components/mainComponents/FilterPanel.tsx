import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Simple custom checkbox component
const SimpleCheckbox = ({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div
      className={`h-5 w-5 border rounded-md cursor-pointer flex items-center justify-center transition-all ${
        checked
          ? "bg-gradient-to-r from-blue-500 to-blue-700 border-blue-600"
          : "bg-primary-darker border-gray-500 hover:border-blue-400"
      }`}
      onClick={onChange}>
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4 text-white">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </div>
  );
};

// Internship-specific filter options
const industries = [
  { id: "tech", label: "Tech & Software" },
  { id: "finance", label: "Finance & Banking" },
  { id: "healthcare", label: "Healthcare" },
  { id: "media", label: "Media & Design" },
  { id: "education", label: "Education" },
  { id: "consulting", label: "Consulting" },
];

const durations = [
  { id: "summer", label: "Summer (3 months)" },
  { id: "semester", label: "Semester (4-6 months)" },
  { id: "year", label: "Year-long (9-12 months)" },
];

const paid = [
  { id: "paid", label: "Paid" },
  { id: "unpaid", label: "Unpaid" },
];

type FilterOptions = {
  industries: string[];
  durations: string[];
  paid: string[];
};

type FilterPanelProps = {
  onApplyFilters: (filters: FilterOptions) => void;
  isOpen: boolean;
};

export function FilterPanel({ onApplyFilters, isOpen }: FilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    industries: [],
    durations: [],
    paid: [],
  });

  const handleCheckboxChange = (category: keyof FilterOptions, id: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };

      if (updated[category].includes(id)) {
        updated[category] = updated[category].filter((item) => item !== id);
      } else {
        updated[category] = [...updated[category], id];
      }

      return updated;
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFilters);
  };

  const clearFilters = () => {
    setSelectedFilters({
      industries: [],
      durations: [],
      paid: [],
    });
    onApplyFilters({
      industries: [],
      durations: [],
      paid: [],
    });
  };

  if (!isOpen) return null;

  return (
    <Card className="card-shadow rounded-2xl bg-primary-darker border backdrop-blur border-secondary-border overflow-hidden">
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Filter Internships
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Industry Filter */}
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-200">Industry</h3>
          <div className="grid grid-cols-2 gap-3">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-border/20 transition-colors">
                <SimpleCheckbox
                  id={`industry-${industry.id}`}
                  checked={selectedFilters.industries.includes(industry.id)}
                  onChange={() =>
                    handleCheckboxChange("industries", industry.id)
                  }
                />
                <Label
                  htmlFor={`industry-${industry.id}`}
                  className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                  {industry.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-200">Duration</h3>
          <div className="grid grid-cols-2 gap-3">
            {durations.map((duration) => (
              <div
                key={duration.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-border/20 transition-colors">
                <SimpleCheckbox
                  id={`duration-${duration.id}`}
                  checked={selectedFilters.durations.includes(duration.id)}
                  onChange={() =>
                    handleCheckboxChange("durations", duration.id)
                  }
                />
                <Label
                  htmlFor={`duration-${duration.id}`}
                  className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                  {duration.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Filter */}
        <div className="space-y-3">
          <h3 className="text-md font-medium text-gray-200">Compensation</h3>
          <div className="grid grid-cols-2 gap-3">
            {paid.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-border/20 transition-colors">
                <SimpleCheckbox
                  id={`paid-${option.id}`}
                  checked={selectedFilters.paid.includes(option.id)}
                  onChange={() => handleCheckboxChange("paid", option.id)}
                />
                <Label
                  htmlFor={`paid-${option.id}`}
                  className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="border border-gray-600 hover:bg-primary-border/20">
            Clear All
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
