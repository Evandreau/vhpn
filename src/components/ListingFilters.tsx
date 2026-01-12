import { useState } from "react";
import { Search, SlidersHorizontal, X, PawPrint, Car, Trees, GraduationCap, Users } from "lucide-react";
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
import { getAvailableCities } from "@/data/listings";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export interface FilterState {
  search: string;
  city: string;
  district: string;
  interiorType: string;
  minSqm: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  furnished: boolean | null;
  parking: boolean;
  petFriendly: boolean;
  outdoorSpace: boolean;
  studentsAllowed: boolean;
  homeSharingAllowed: boolean;
  sort: string;
}

interface ListingFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultsCount: number;
}

const ListingFilters = ({ filters, onFilterChange, resultsCount }: ListingFiltersProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { t } = useLanguage();
  const cities = getAvailableCities();

  const updateFilter = (key: keyof FilterState, value: string | boolean | null) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      city: "",
      district: "",
      interiorType: "",
      minSqm: "",
      minPrice: "",
      maxPrice: "",
      beds: "",
      furnished: null,
      parking: false,
      petFriendly: false,
      outdoorSpace: false,
      studentsAllowed: false,
      homeSharingAllowed: false,
      sort: "newest",
    });
  };

  const hasActiveFilters = filters.search || filters.city || filters.district ||
    filters.interiorType || filters.minSqm || filters.minPrice || 
    filters.maxPrice || filters.beds || filters.furnished !== null || 
    filters.parking || filters.petFriendly || filters.outdoorSpace || 
    filters.studentsAllowed || filters.homeSharingAllowed;

  const chipFilters = [
    { key: 'furnished', label: t('filters.furnished'), icon: null, active: filters.furnished === true },
    { key: 'parking', label: t('filters.parking'), icon: Car, active: filters.parking },
    { key: 'petFriendly', label: t('filters.petFriendly'), icon: PawPrint, active: filters.petFriendly },
    { key: 'outdoorSpace', label: t('filters.outdoorSpace'), icon: Trees, active: filters.outdoorSpace },
    { key: 'studentsAllowed', label: t('filters.studentsAllowed'), icon: GraduationCap, active: filters.studentsAllowed },
    { key: 'homeSharingAllowed', label: t('filters.homeSharingAllowed'), icon: Users, active: filters.homeSharingAllowed },
  ];

  return (
    <div className="sticky top-[73px] z-40 bg-background border-b border-border">
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Filters */}
        <div className="hidden lg:block space-y-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-9 h-10 font-body text-sm border-border bg-background rounded-sm"
              />
            </div>

            {/* City */}
            <Select value={filters.city} onValueChange={(v) => updateFilter("city", v)}>
              <SelectTrigger className="w-40 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue placeholder={t('filters.allCities')} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">{t('filters.allCities')}</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder={t('filters.priceMin')}
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="w-28 h-10 font-body text-sm border-border rounded-sm"
              />
              <span className="text-muted-foreground">–</span>
              <Input
                type="number"
                placeholder={t('filters.priceMax')}
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="w-28 h-10 font-body text-sm border-border rounded-sm"
              />
            </div>

            {/* Beds */}
            <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
              <SelectTrigger className="w-32 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue placeholder={t('filters.bedrooms')} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="any">{t('filters.anyBedrooms')}</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>

            {/* District */}
            <Select value={filters.district} onValueChange={(v) => updateFilter("district", v)}>
              <SelectTrigger className="w-32 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue placeholder={t('filters.district')} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">{t('filters.allDistricts')}</SelectItem>
                <SelectItem value="Centrum">Centrum</SelectItem>
                <SelectItem value="Noord">Noord</SelectItem>
                <SelectItem value="Zuid">Zuid</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="Oost">Oost</SelectItem>
              </SelectContent>
            </Select>

            {/* Interior Type */}
            <Select value={filters.interiorType} onValueChange={(v) => updateFilter("interiorType", v)}>
              <SelectTrigger className="w-36 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue placeholder={t('filters.interior')} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">{t('filters.allInterior')}</SelectItem>
                <SelectItem value="kaal">{t('filters.interiorBare')}</SelectItem>
                <SelectItem value="gestoffeerd">{t('filters.interiorUpholstered')}</SelectItem>
                <SelectItem value="gemeubileerd">{t('filters.interiorFurnished')}</SelectItem>
              </SelectContent>
            </Select>

            {/* Living Area */}
            <Select value={filters.minSqm} onValueChange={(v) => updateFilter("minSqm", v)}>
              <SelectTrigger className="w-28 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue placeholder={t('filters.livingArea')} />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="all">{t('filters.anyArea')}</SelectItem>
                <SelectItem value="25">25+ m²</SelectItem>
                <SelectItem value="50">50+ m²</SelectItem>
                <SelectItem value="75">75+ m²</SelectItem>
                <SelectItem value="100">100+ m²</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
              <SelectTrigger className="w-44 h-10 font-body text-sm border-border rounded-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="newest">{t('filters.newest')}</SelectItem>
                <SelectItem value="price-low">{t('filters.priceLowHigh')}</SelectItem>
                <SelectItem value="price-high">{t('filters.priceHighLow')}</SelectItem>
                <SelectItem value="sqm">{t('filters.sizeLargest')}</SelectItem>
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
                {t('filters.clearAll')}
              </Button>
            )}
          </div>

          {/* Chip Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {chipFilters.map((chip) => (
              <button
                key={chip.key}
                onClick={() => {
                  if (chip.key === 'furnished') {
                    updateFilter(chip.key as keyof FilterState, filters.furnished === true ? null : true);
                  } else {
                    updateFilter(chip.key as keyof FilterState, !filters[chip.key as keyof FilterState]);
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all duration-200",
                  chip.active
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {chip.icon && <chip.icon className="h-3.5 w-3.5" />}
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('filters.search')}
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

          {/* Mobile Chip Filters */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-2 -mx-2 px-2">
            {chipFilters.map((chip) => (
              <button
                key={chip.key}
                onClick={() => {
                  if (chip.key === 'furnished') {
                    updateFilter(chip.key as keyof FilterState, filters.furnished === true ? null : true);
                  } else {
                    updateFilter(chip.key as keyof FilterState, !filters[chip.key as keyof FilterState]);
                  }
                }}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all duration-200",
                  chip.active
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {chip.icon && <chip.icon className="h-3.5 w-3.5" />}
                {chip.label}
              </button>
            ))}
          </div>

          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
              <Select value={filters.city} onValueChange={(v) => updateFilter("city", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder={t('filters.city')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">{t('filters.allCities')}</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.beds} onValueChange={(v) => updateFilter("beds", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder={t('filters.bedrooms')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="any">{t('filters.anyBedrooms')}</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.district} onValueChange={(v) => updateFilter("district", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder={t('filters.district')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">{t('filters.allDistricts')}</SelectItem>
                  <SelectItem value="Centrum">Centrum</SelectItem>
                  <SelectItem value="Noord">Noord</SelectItem>
                  <SelectItem value="Zuid">Zuid</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="Oost">Oost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.interiorType} onValueChange={(v) => updateFilter("interiorType", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder={t('filters.interior')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">{t('filters.allInterior')}</SelectItem>
                  <SelectItem value="kaal">{t('filters.interiorBare')}</SelectItem>
                  <SelectItem value="gestoffeerd">{t('filters.interiorUpholstered')}</SelectItem>
                  <SelectItem value="gemeubileerd">{t('filters.interiorFurnished')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.minSqm} onValueChange={(v) => updateFilter("minSqm", v)}>
                <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm">
                  <SelectValue placeholder={t('filters.livingArea')} />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="all">{t('filters.anyArea')}</SelectItem>
                  <SelectItem value="25">25+ m²</SelectItem>
                  <SelectItem value="50">50+ m²</SelectItem>
                  <SelectItem value="75">75+ m²</SelectItem>
                  <SelectItem value="100">100+ m²</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder={t('filters.priceMin')}
                value={filters.minPrice}
                onChange={(e) => updateFilter("minPrice", e.target.value)}
                className="h-10 font-body text-sm border-border rounded-sm"
              />

              <Input
                type="number"
                placeholder={t('filters.priceMax')}
                value={filters.maxPrice}
                onChange={(e) => updateFilter("maxPrice", e.target.value)}
                className="h-10 font-body text-sm border-border rounded-sm"
              />

              <div className="col-span-2 flex items-center justify-between">
                <Select value={filters.sort} onValueChange={(v) => updateFilter("sort", v)}>
                  <SelectTrigger className="h-10 font-body text-sm border-border rounded-sm flex-1">
                    <SelectValue placeholder={t('filters.sortBy')} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border">
                    <SelectItem value="newest">{t('filters.newest')}</SelectItem>
                    <SelectItem value="price-low">{t('filters.priceLowHigh')}</SelectItem>
                    <SelectItem value="price-high">{t('filters.priceHighLow')}</SelectItem>
                    <SelectItem value="sqm">{t('filters.sizeLargest')}</SelectItem>
                  </SelectContent>
                </Select>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="font-body text-sm ml-2"
                  >
                    {t('filters.clearAll')}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="font-body text-sm text-muted-foreground">
            {resultsCount} {resultsCount === 1 ? t('listings.result') : t('listings.results')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;
