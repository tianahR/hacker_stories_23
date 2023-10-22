const Search = ({search,onSearch}) => (
    <div>
      <label htmlFor="search">Search: </label>
      <input 
        id="search" 
        type="text"
        value={search} 
        onChange={onSearch} />
      <p>Searching for <strong>{search}</strong></p>
    </div>
    
  );
export default Search;  