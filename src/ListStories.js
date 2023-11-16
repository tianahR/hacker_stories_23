const ListStories = ({list,onRemoveItem}) => (
    <ul>
      {list.map((item) => (
        <Item 
          key={item.objectID} 
          item={item} 
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
  
  const Item = ({item, onRemoveItem}) => (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      &nbsp;
      <span>{item.author}</span>
      &nbsp;
      <span>{item.num_comments}</span>
      &nbsp;
      <span>{item.points}</span>
      &nbsp;
      <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Remove
      </button>

      </span>
    </li>
  );
  export default ListStories;
