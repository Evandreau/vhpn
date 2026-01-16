import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  nl: {
    // Navigation
    'nav.rentals': 'Huren',
    'nav.about': 'Over ons',
    'nav.contact': 'Contact',
    'nav.landlords': 'Verhuren',
    'nav.viewRentals': 'Bekijk aanbod',
    
    // Hero
    'hero.title': 'We match the right people',
    'hero.titleAccent': 'with the right properties.',
    'hero.subtitle': 'Premium huurwoningen in de Randstad.',
    'hero.cta': 'Bekijk aanbod',
    'hero.searchPlaceholder': 'Zoek op stad of wijk...',
    
    // Listings
    'listings.title': 'Huurwoningen',
    'listings.subtitle': 'Ontdek ons zorgvuldig samengestelde aanbod van huurwoningen in de Randstad.',
    'listings.featured': 'Uitgelicht',
    'listings.furnished': 'Gemeubileerd',
    'listings.unfurnished': 'Ongemeubileerd',
    'listings.availableNow': 'Direct beschikbaar',
    'listings.availableFrom': 'Beschikbaar vanaf',
    'listings.perMonth': '/maand',
    'listings.beds': 'slaapkamers',
    'listings.bed': 'slaapkamer',
    'listings.studio': 'Studio',
    'listings.baths': 'badkamers',
    'listings.bath': 'badkamer',
    'listings.sqm': 'm²',
    'listings.viewListing': 'Bekijk woning',
    'listings.noResults': 'Geen woningen gevonden',
    'listings.noResultsDesc': 'Probeer andere filters of neem contact met ons op.',
    'listings.loadMore': 'Meer laden',
    'listings.results': 'woningen gevonden',
    'listings.result': 'woning gevonden',
    'listings.readMore': 'Lees verder',
    
    // Filters
    'filters.search': 'Zoeken',
    'filters.city': 'Stad',
    'filters.allCities': 'Alle steden',
    'filters.priceMin': 'Min prijs',
    'filters.priceMax': 'Max prijs',
    'filters.bedrooms': 'Slaapkamers',
    'filters.anyBedrooms': 'Alle',
    'filters.furnished': 'Gemeubileerd',
    'filters.parking': 'Parkeren',
    'filters.petFriendly': 'Huisdieren',
    'filters.outdoorSpace': 'Buitenruimte',
    'filters.studentsAllowed': 'Studenten',
    'filters.homeSharingAllowed': 'Delen toegestaan',
    'filters.sortBy': 'Sorteren',
    'filters.newest': 'Nieuwste',
    'filters.priceLowHigh': 'Prijs laag-hoog',
    'filters.priceHighLow': 'Prijs hoog-laag',
    'filters.sizeLargest': 'Grootste',
    'filters.clearAll': 'Wis filters',
    'filters.moreFilters': 'Meer filters',
    'filters.district': 'Stadsdeel',
    'filters.allDistricts': 'Alle stadsdelen',
    'filters.interior': 'Interieur',
    'filters.allInterior': 'Alle interieurs',
    'filters.interiorBare': 'Kaal',
    'filters.interiorUpholstered': 'Gestoffeerd',
    'filters.interiorFurnished': 'Gemeubileerd',
    'filters.livingArea': 'Oppervlakte',
    'filters.anyArea': 'Alle',
    
    // Listing Detail
    'detail.backToListings': 'Terug naar aanbod',
    'detail.description': 'Beschrijving',
    'detail.features': 'Kenmerken & voorzieningen',
    'detail.location': 'Locatie',
    'detail.approximateLocation': 'Geschatte locatie - exact adres na contact',
    'detail.similarProperties': 'Vergelijkbare woningen',
    'detail.deposit': 'Borg',
    'detail.minStay': 'Minimale huurperiode',
    'detail.months': 'maanden',
    'detail.contractType': 'Contracttype',
    'detail.fixedTerm': 'Bepaalde tijd',
    'detail.indefinite': 'Onbepaalde tijd',
    
    // Forms
    'form.requestViewing': 'Plan een bezichtiging',
    'form.expressInterest': 'Interesse tonen',
    'form.fullApplication': 'Volledige aanvraag',
    'form.name': 'Naam',
    'form.email': 'E-mail',
    'form.phone': 'Telefoon',
    'form.message': 'Bericht',
    'form.preferredDate': 'Voorkeursdatum',
    'form.preferredDate1': 'Voorkeursdatum 1',
    'form.preferredDate2': 'Voorkeursdatum 2',
    'form.preferredDate3': 'Voorkeursdatum 3',
    'form.timeSlot': 'Tijdslot',
    'form.morning': 'Ochtend (9:00-12:00)',
    'form.afternoon': 'Middag (12:00-17:00)',
    'form.evening': 'Avond (17:00-20:00)',
    'form.grossMonthlyIncome': 'Bruto maandinkomen',
    'form.partnerGrossMonthlyIncome': 'Bruto maandinkomen partner',
    'form.budget': 'Budget',
    'form.moveInDate': 'Gewenste ingangsdatum',
    'form.rentalPeriod': 'Huurperiode',
    'form.rentalPeriod6': '6 maanden',
    'form.rentalPeriod12': '12 maanden',
    'form.rentalPeriod24': '24 maanden',
    'form.rentalPeriodIndefinite': 'Onbepaalde tijd',
    'form.preferredArea': 'Gewenste gebied',
    'form.submit': 'Versturen',
    'form.sending': 'Versturen...',
    'form.success': 'Succesvol verzonden!',
    'form.successMessage': 'We nemen binnen 24 uur contact met u op.',
    'form.required': 'Verplicht veld',
    'form.invalidEmail': 'Ongeldig e-mailadres',
    'form.privacy': 'Door dit formulier te verzenden gaat u akkoord met onze',
    'form.privacyPolicy': 'privacyverklaring',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Neem contact met ons op. We helpen u graag bij het vinden van uw ideale woning.',
    'contact.officeHours': 'Kantooruren',
    'contact.mondayFriday': 'Maandag - Vrijdag',
    'contact.saturday': 'Zaterdag',
    'contact.sunday': 'Zondag',
    'contact.closed': 'Gesloten',
    
    // About
    'about.title': 'Over ons',
    'about.subtitle': 'Wij zijn gespecialiseerd in premium huurwoningen voor veeleisende huurders.',
    'about.story': 'Ons verhaal',
    'about.approach': 'Onze aanpak',
    'about.serviceAreas': 'Werkgebieden',
    'about.team': 'Ons team',
    
    // Landlords
    'landlords.title': 'Voor verhuurders',
    'landlords.subtitle': 'Maximaliseer uw rendement met onze professionele verhuurdiensten.',
    'landlords.submitProperty': 'Woning aanmelden',
    'landlords.contactUs': 'Neem contact op',
    'landlords.propertyType': 'Type woning',
    'landlords.apartment': 'Appartement',
    'landlords.house': 'Woonhuis',
    'landlords.studio': 'Studio',
    'landlords.expectedRent': 'Verwachte huurprijs',
    'landlords.photos': 'Foto\'s (optioneel)',
    
    // How it works
    'howItWorks.title': 'Hoe het werkt',
    'howItWorks.forTenants': 'Voor huurders',
    'howItWorks.forLandlords': 'Voor verhuurders',
    'howItWorks.tenant.step1.title': 'Zoek & ontdek',
    'howItWorks.tenant.step1.desc': 'Blader door ons aanbod en vind woningen die bij u passen.',
    'howItWorks.tenant.step2.title': 'Plan een bezichtiging',
    'howItWorks.tenant.step2.desc': 'Vraag een bezichtiging aan voor de woningen die u interesseren.',
    'howItWorks.tenant.step3.title': 'Screening',
    'howItWorks.tenant.step3.desc': 'Doorloop ons screeningsproces voor een soepele afhandeling.',
    'howItWorks.tenant.step4.title': 'Onderteken & betrek',
    'howItWorks.tenant.step4.desc': 'Onderteken het contract en ontvang de sleutels van uw nieuwe thuis.',
    'howItWorks.landlord.step1.title': 'Meld uw woning aan',
    'howItWorks.landlord.step1.desc': 'Deel de details van uw woning via ons eenvoudige formulier.',
    'howItWorks.landlord.step2.title': 'Prijs & positionering',
    'howItWorks.landlord.step2.desc': 'Wij adviseren over de optimale huurprijs en presentatie.',
    'howItWorks.landlord.step3.title': 'Marketing',
    'howItWorks.landlord.step3.desc': 'Professionele foto\'s en plaatsing op alle relevante platforms.',
    'howItWorks.landlord.step4.title': 'Huurderscreening',
    'howItWorks.landlord.step4.desc': 'Wij selecteren betrouwbare huurders voor uw woning.',
    
    // Trust
    'trust.verifiedListings': 'Geverifieerde woningen',
    'trust.verifiedDesc': 'Alle woningen worden door ons team gecontroleerd.',
    'trust.testimonials': 'Wat onze klanten zeggen',
    
    // CTA
    'cta.cantFind': 'Niet gevonden wat u zoekt?',
    'cta.cantFindDesc': 'Laat uw wensen achter en wij zoeken voor u.',
    'cta.leaveDetails': 'Laat uw gegevens achter',
    
    // Footer
    'footer.properties': 'Woningen',
    'footer.apartments': 'Appartementen',
    'footer.houses': 'Woonhuizen',
    'footer.studios': 'Studio\'s',
    'footer.luxury': 'Luxe woningen',
    'footer.company': 'Bedrijf',
    'footer.aboutUs': 'Over ons',
    'footer.contact': 'Contact',
    'footer.landlords': 'Verhuurders',
    'footer.support': 'Ondersteuning',
    'footer.helpCenter': 'Helpcentrum',
    'footer.privacyPolicy': 'Privacyverklaring',
    'footer.terms': 'Algemene voorwaarden',
    'footer.rights': 'Alle rechten voorbehouden.',
  },
  en: {
    // Navigation
    'nav.rentals': 'Rentals',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.landlords': 'Landlords',
    'nav.viewRentals': 'View rentals',
    
    // Hero
    'hero.title': 'We match the right people',
    'hero.titleAccent': 'with the right properties.',
    'hero.subtitle': 'Premium rentals in the Randstad.',
    'hero.cta': 'View rentals',
    'hero.searchPlaceholder': 'Search by city or neighborhood...',
    
    // Listings
    'listings.title': 'Rentals',
    'listings.subtitle': 'Discover our carefully curated collection of rental properties in the Randstad.',
    'listings.featured': 'Featured',
    'listings.furnished': 'Furnished',
    'listings.unfurnished': 'Unfurnished',
    'listings.availableNow': 'Available now',
    'listings.availableFrom': 'Available from',
    'listings.perMonth': '/month',
    'listings.beds': 'bedrooms',
    'listings.bed': 'bedroom',
    'listings.studio': 'Studio',
    'listings.baths': 'bathrooms',
    'listings.bath': 'bathroom',
    'listings.sqm': 'm²',
    'listings.viewListing': 'View listing',
    'listings.noResults': 'No properties found',
    'listings.noResultsDesc': 'Try adjusting your filters or contact us.',
    'listings.loadMore': 'Load more',
    'listings.results': 'properties found',
    'listings.result': 'property found',
    'listings.readMore': 'Read more',
    
    // Filters
    'filters.search': 'Search',
    'filters.city': 'City',
    'filters.allCities': 'All cities',
    'filters.priceMin': 'Min price',
    'filters.priceMax': 'Max price',
    'filters.bedrooms': 'Bedrooms',
    'filters.anyBedrooms': 'Any',
    'filters.furnished': 'Furnished',
    'filters.parking': 'Parking',
    'filters.petFriendly': 'Pet friendly',
    'filters.outdoorSpace': 'Outdoor space',
    'filters.studentsAllowed': 'Students',
    'filters.homeSharingAllowed': 'Sharing allowed',
    'filters.sortBy': 'Sort by',
    'filters.newest': 'Newest',
    'filters.priceLowHigh': 'Price low-high',
    'filters.priceHighLow': 'Price high-low',
    'filters.sizeLargest': 'Largest',
    'filters.clearAll': 'Clear filters',
    'filters.moreFilters': 'More filters',
    'filters.district': 'District',
    'filters.allDistricts': 'All districts',
    'filters.interior': 'Interior',
    'filters.allInterior': 'All interiors',
    'filters.interiorBare': 'Bare',
    'filters.interiorUpholstered': 'Upholstered',
    'filters.interiorFurnished': 'Furnished',
    'filters.livingArea': 'Living area',
    'filters.anyArea': 'Any',
    
    // Listing Detail
    'detail.backToListings': 'Back to listings',
    'detail.description': 'Description',
    'detail.features': 'Features & amenities',
    'detail.location': 'Location',
    'detail.approximateLocation': 'Approximate location - exact address upon contact',
    'detail.similarProperties': 'Similar properties',
    'detail.deposit': 'Deposit',
    'detail.minStay': 'Minimum rental period',
    'detail.months': 'months',
    'detail.contractType': 'Contract type',
    'detail.fixedTerm': 'Fixed term',
    'detail.indefinite': 'Indefinite',
    
    // Forms
    'form.requestViewing': 'Schedule a viewing',
    'form.expressInterest': 'Express interest',
    'form.fullApplication': 'Full application',
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.message': 'Message',
    'form.preferredDate': 'Preferred date',
    'form.preferredDate1': 'Preferred date 1',
    'form.preferredDate2': 'Preferred date 2',
    'form.preferredDate3': 'Preferred date 3',
    'form.timeSlot': 'Time slot',
    'form.morning': 'Morning (9:00-12:00)',
    'form.afternoon': 'Afternoon (12:00-17:00)',
    'form.evening': 'Evening (17:00-20:00)',
    'form.grossMonthlyIncome': 'Gross monthly income',
    'form.partnerGrossMonthlyIncome': 'Partner gross monthly income',
    'form.budget': 'Budget',
    'form.moveInDate': 'Move-in date',
    'form.rentalPeriod': 'Rental period',
    'form.rentalPeriod6': '6 months',
    'form.rentalPeriod12': '12 months',
    'form.rentalPeriod24': '24 months',
    'form.rentalPeriodIndefinite': 'Indefinite',
    'form.preferredArea': 'Preferred area',
    'form.submit': 'Submit',
    'form.sending': 'Sending...',
    'form.success': 'Successfully sent!',
    'form.successMessage': 'We will contact you within 24 hours.',
    'form.required': 'Required field',
    'form.invalidEmail': 'Invalid email address',
    'form.privacy': 'By submitting this form you agree to our',
    'form.privacyPolicy': 'privacy policy',
    
    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in touch with us. We are happy to help you find your ideal home.',
    'contact.officeHours': 'Office hours',
    'contact.mondayFriday': 'Monday - Friday',
    'contact.saturday': 'Saturday',
    'contact.sunday': 'Sunday',
    'contact.closed': 'Closed',
    
    // About
    'about.title': 'About us',
    'about.subtitle': 'We specialize in premium rental properties for discerning tenants.',
    'about.story': 'Our story',
    'about.approach': 'Our approach',
    'about.serviceAreas': 'Service areas',
    'about.team': 'Our team',
    
    // Landlords
    'landlords.title': 'For landlords',
    'landlords.subtitle': 'Maximize your returns with our professional rental services.',
    'landlords.submitProperty': 'Submit property',
    'landlords.contactUs': 'Contact us',
    'landlords.propertyType': 'Property type',
    'landlords.apartment': 'Apartment',
    'landlords.house': 'House',
    'landlords.studio': 'Studio',
    'landlords.expectedRent': 'Expected rent',
    'landlords.photos': 'Photos (optional)',
    
    // How it works
    'howItWorks.title': 'How it works',
    'howItWorks.forTenants': 'For tenants',
    'howItWorks.forLandlords': 'For landlords',
    'howItWorks.tenant.step1.title': 'Browse & discover',
    'howItWorks.tenant.step1.desc': 'Explore our listings and find properties that suit your needs.',
    'howItWorks.tenant.step2.title': 'Schedule a viewing',
    'howItWorks.tenant.step2.desc': 'Request a viewing for the properties you are interested in.',
    'howItWorks.tenant.step3.title': 'Screening',
    'howItWorks.tenant.step3.desc': 'Complete our screening process for a smooth transaction.',
    'howItWorks.tenant.step4.title': 'Sign & move in',
    'howItWorks.tenant.step4.desc': 'Sign the contract and receive the keys to your new home.',
    'howItWorks.landlord.step1.title': 'Submit your property',
    'howItWorks.landlord.step1.desc': 'Share your property details through our simple form.',
    'howItWorks.landlord.step2.title': 'Pricing & positioning',
    'howItWorks.landlord.step2.desc': 'We advise on optimal pricing and presentation.',
    'howItWorks.landlord.step3.title': 'Marketing',
    'howItWorks.landlord.step3.desc': 'Professional photos and placement on all relevant platforms.',
    'howItWorks.landlord.step4.title': 'Tenant screening',
    'howItWorks.landlord.step4.desc': 'We select reliable tenants for your property.',
    
    // Trust
    'trust.verifiedListings': 'Verified listings',
    'trust.verifiedDesc': 'All properties are verified by our team.',
    'trust.testimonials': 'What our clients say',
    
    // CTA
    'cta.cantFind': "Can't find what you're looking for?",
    'cta.cantFindDesc': 'Leave your requirements and we will search for you.',
    'cta.leaveDetails': 'Leave your details',
    
    // Footer
    'footer.properties': 'Properties',
    'footer.apartments': 'Apartments',
    'footer.houses': 'Houses',
    'footer.studios': 'Studios',
    'footer.luxury': 'Luxury rentals',
    'footer.company': 'Company',
    'footer.aboutUs': 'About us',
    'footer.contact': 'Contact',
    'footer.landlords': 'Landlords',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help center',
    'footer.privacyPolicy': 'Privacy policy',
    'footer.terms': 'Terms of service',
    'footer.rights': 'All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('haven-language');
    return (stored as Language) || 'nl';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('haven-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
