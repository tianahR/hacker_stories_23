
import * as React from 'react';
import Search from './Search';
import ListStories from './ListStories'


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
  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* <Search onSearch={handleSearch} searchterm={searchTerm}/> */}
      <Search onSearch={handleSearch} search={searchTerm}/> 

      <hr />

      <ListStories list={searchedStories} />
    </div>
  );
};




export default App;
