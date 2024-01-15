import * as React from 'react';
import styles from './App.module.css';
import styled from 'styled-components';

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

const StyledLabel = styled.label`
border-top: 1px solid #171212;
border-left: 1px solid #171212;
padding-left: 5px;
font-size: 24px;
`;


const StyledInput = styled.input`
border: none;
border-bottom: 1px solid #171212;
background-color: transparent;
font-size: 24px;
`;


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
      <StyledLabel htmlFor={id}>{children}  </StyledLabel>
      &nbsp;
      <StyledInput
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onInputChange}
        className={styles.input}
      />
    </>
  )};

  export default InputWithLabel;