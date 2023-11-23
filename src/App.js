
import * as React from 'react';
// import Search from './Search';
import InputWithLabel from './InputWithLabel';
import ListStories from './ListStories';


const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Learn To Code',
    url: 'https://www.w3schools.com/',
    author: 'Anonymous',
    num_comments: 2,
    points: 5,
    objectID: 2,
  }
];


const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );


const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

// const storiesReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_STORIES':
//       return action.payload;
//     case 'REMOVE_STORY':
//       return state.filter(
//         (story) => action.payload.objectID !== story.objectID
//       );
//     default:
//       throw new Error();
//   }
// };

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
  

  //const [searchTerm, setSearchTerm] = React.useState('');
  // const [searchTerm, setSearchTerm] = React.useState('React');
  // const [searchTerm, setSearchTerm] = React.useState(
  //   localStorage.getItem('search') || 'React'
  //   );

  //   React.useEffect(() => {
  //     localStorage.setItem('search', searchTerm);
  //     }, [searchTerm]);

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

// const [stories, setStories] = React.useState([]); //initial value

// const [stories, dispatchStories] = React.useReducer(
//   storiesReducer,
//   []
// );
// const [isLoading, setIsLoading] = React.useState(false);
// const [isError, setIsError] = React.useState(false);


const [stories, dispatchStories] = React.useReducer(
  storiesReducer,
  { data: [], isLoading: false, isError: false }
);


// React.useEffect(() => {

//   setIsLoading(true);

//   getAsyncStories()
//   .then((result) => {
//     // setStories(result.data.stories);
//     dispatchStories({
//       type: 'SET_STORIES',
//       payload: result.data.stories,
//     });
//     setIsLoading(false);
//   })
//   .catch(() => setIsError(true));
// }, []);

React.useEffect(() => {
  dispatchStories({ type: 'STORIES_FETCH_INIT' });

  getAsyncStories()
    .then((result) => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.stories,
      });
    })
    .catch(() =>
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    );
}, []);




  // remove items 
  const handleRemoveStory = (item) => {
    // const newStories = stories.filter(
    //   (story) => item.objectID !== story.objectID
    // );

    // setStories(newStories);

    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };


  const handleSearch = (event) => {
    // setSearchTerm(event.target.value);
    setSearchTerm(event.target.value);
    //localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* <Search onSearch={handleSearch} searchterm={searchTerm}/> */}
      {/* <Search onSearch={handleSearch} search={searchTerm}/>  */}

      {/* Reusable components */}

      {/* <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      /> */}

      {/* React Component Composition */}

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
          <strong> Search:</strong> 

      </InputWithLabel>
        
      


      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
          <p>Loading ...</p>
      ) : (<ListStories 
            list={searchedStories} 
            onRemoveItem={handleRemoveStory}
          />
      )}
    </div>
  );
};




export default App;
