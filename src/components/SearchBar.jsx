import { Input } from "antd";

function SearchBar({ search, onSearch }) {
  return (
    <Input.Search
      placeholder="Search products by name..."
      allowClear
      enterButton
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      style={{ maxWidth: 360, width: "100%" }}
    />
  );
}

export default SearchBar;
