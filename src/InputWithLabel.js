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

// React component composition , using react prop children

const InputWithLabel = ({
    id,
    children,
    value,
    type = 'text',
    onInputChange,
  }) => (
    <>
      <label htmlFor={id}>{children}</label>
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