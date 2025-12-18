import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'nl', label: 'NL' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50">
      {languages.map((lang, index) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "px-2.5 py-1 text-xs font-body font-medium rounded-full transition-all duration-200",
            language === lang.code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${lang.label}`}
          aria-pressed={language === lang.code}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
