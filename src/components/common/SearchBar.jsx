export default function SearchBar({ value, onChange }) {
  return (
    <div className="searchWrap">
      <input
        type="text"
        className="searchInput"
        placeholder="Search projects..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
