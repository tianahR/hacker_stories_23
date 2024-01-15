
import * as React from 'react';
// import Search from './Search';
// import InputWithLabel from './InputWithLabel';
import ListStories from './ListStories';
import SearchForm from './SearchForm';
import axios from 'axios';
// import styles from './App.module.css'; // CSS module - CSS in css 
//  import './App.css';
import styled from 'styled-components'; // Styled Component - CSS IN JS 
// import { ReactComponent as Check } from './check-square-svgrepo-com.svg';


const StyledContainer = styled.div`
height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
font-size: 48px;
font-weight: 300;
letter-spacing: 2px;
`;



const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';


const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  
    

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};



const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};


const App = () => {


  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );


  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
    );


    const handleSearchInput = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
       setUrl(`${API_ENDPOINT}${searchTerm}`);
       event.preventDefault();
     };

    


const [stories, dispatchStories] = React.useReducer(
  storiesReducer,
  { data: [], isLoading: false, isError: false }
);


const handleFetchStories = React.useCallback(async () => {
   
    // if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try{
      const result = await axios.get(url);
    
    
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
        });

    }
    catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

    
      
  }, [url]); 

React.useEffect(() => {
  handleFetchStories();
}, [handleFetchStories]);




  // remove items 
  const handleRemoveStory = (item) => {
      dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };


  return (

    <StyledContainer>

          <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>

                {/* <div className={styles.container}> */}
                {/* <h1 className="headline-primary">My Hacker Stories</h1> */}
                {/* <h1 className={styles.headlinePrimary}>My Hacker Stories</h1> */}

          <SearchForm
              searchTerm={searchTerm}
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
          />


          {/* <hr /> */}

          {stories.isError && <p>Something went wrong ...</p>}

          {stories.isLoading ? (
              <p>Loading ...</p>
          ) : (<ListStories 
                list={stories.data}
                onRemoveItem={handleRemoveStory}
              />
          )}
                {/* </div> */}


          

        
    </StyledContainer>
   
  );
};




export default App;
