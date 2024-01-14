import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

type SearchBarProps = {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ handleSearchChange }: SearchBarProps) => {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search Lines"
        aria-label="Search Lines"
        onChange={handleSearchChange}
      />
    </InputGroup>
  );
};

export default SearchBar;
