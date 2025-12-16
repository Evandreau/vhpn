import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cities } from "@/data/listings";
import { cn } from "@/lib/utils";

export interface FilterState {
  search: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  furnished: boolean;
  availableFrom: string;
  sort: string;
}

interface ListingFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultsCount: number;
}

const ListingFilters = ({ filters, onFilterChange, resultsCount }: ListingFiltersProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | boolean) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      city: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      furnished: false,
      availableFrom: "",
      sort: "newest",
    });
  };

  const hasActiveFilters = filters.search || filters.city || filters.minPrice || 
    filters.maxPrice || filters.beds || filters.furnished || filters.availableFrom;

  return (
    <div className="sticky top-[73px] z-40 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search neighborhood..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-9 h-10 font-body text-sm border-border bg-background rounded-sm"
            />
          </div>

          {/* City */}
          <Select value={filters.city} onValueChange={(v) => updateFilter("city", v)}>
            <SelectTrigger className="w-40 h-10 font-body text-sm border-border rounded-sm">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="all">All cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min €"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-24 h-10 font-body text-sm border-border rounded-sm"
            />
            <span className="text-muted-foreground">–</span>
            <Input
              type="number"
              placeholder="Max €"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-24 h-10 font-body text-sm border-border rounded-sm"
            />
          </div>

          {/* Beds */}
          <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
            <SelectTrigger className="w-32 h-10 font-body text-sm border-border rounded-sm">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="any">Any beds</SelectItem>
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>

          {/* Furnished Toggle */}
          <div className="flex items-center gap-2 px-3">
            <Switch
              id="furnished"
              checked={filters.furnished}
              onCheckedChange={(checked) => updateFilter("furnished", checked)}
            />
            <Label htmlFor="furnished" className="font-body text-sm cursor-pointer">
              Furnished
            </Label>
          </div>

          {/* Sort */}
          <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
            <SelectTrigger className="w-40 h-10 font-body text-sm border-border rounded-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="sqm">Size (m²)</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="font-body text-sm text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-9 h-10 font-body text-sm border-border rounded-sm"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={cn("h-10 w-10 border-border rounded-sm", showMobileFilters && "bg-secondary")}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
              <Select value={filters.city} onValueChange={(v) => updateFilter("city", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="any">Any beds</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="h-10 font-body text-sm border-border rounded-sm"
              />

              <Input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="h-10 font-body text-sm border-border rounded-sm"
              />

              <div className="col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="furnished-mobile"
                    checked={filters.furnished}
                    onCheckedChange={(checked) => updateFilter("furnished", checked)}
                  />
                  <Label htmlFor="furnished-mobile" className="font-body text-sm">
                    Furnished only
                  </Label>
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="font-body text-sm"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
                <SelectTrigger className="col-span-2 h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="sqm">Size (m²)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="font-body text-sm text-muted-foreground">
            {resultsCount} {resultsCount === 1 ? "property" : "properties"} found
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
