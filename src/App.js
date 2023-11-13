
import * as React from 'react';
// import Search from './Search';
import InputWithLabel from './InputWithLabel';
import ListStories from './ListStories';


const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
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

  const handleSearch = (event) => {
    // setSearchTerm(event.target.value);
    setSearchTerm(event.target.value);
    //localStorage.setItem('search', event.target.value);
  };

  const searchedStories = stories.filter((story) =>
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
        onInputChange={handleSearch}>
          <strong> Search:</strong>
      </InputWithLabel>
        
      


      <hr />

      <ListStories list={searchedStories} />
    </div>
  );
};




export default App;
