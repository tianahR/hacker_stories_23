// const Search = ({search,onSearch}) => (
//     <>
//       <label htmlFor="search">Search: </label>
//       <input 
//         id="search" 
//         type="text"
//         value={search} 
//         onChange={onSearch} />
//       <p>Searching for <strong>{search}</strong></p>
//     </>
    
//   );
// export default Search; 

const InputWithLabel = ({
    id,
    label,
    value,
    type = 'text',
    onInputChange,
  }) => (
    <>
      <label htmlFor={id}>{label}</label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );

  export default InputWithLabel;