import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchInputProps = {
  searchTerm: string;
  onChange: (term: string) => void;
};

export default function SearchInput({
  searchTerm,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="search recipes by name..."
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-lg border border-border focus:ring-2 focus:ring-primary-foreground focus:border-primary-foreground outline-none text-foreground bg-card"
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
