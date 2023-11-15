import * as React from 'react';
// import Search from '.
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
    isFocused
  }) => {

    const inputRef = React.useRef();

    React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
    
    return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  )};

  export default InputWithLabel;