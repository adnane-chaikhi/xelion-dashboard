import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 bg-[#1f2937] text-white px-3 py-1 rounded hover:bg-[#374151] transition"
    >
      <Globe className="w-4 h-4" />
      <span>{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
    </button>
  );
}
