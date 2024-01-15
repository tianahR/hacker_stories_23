// import styles from './App.module.css';
import styled from 'styled-components';
import './App.css';
import { ReactComponent as Check } from './check-square-svgrepo-com.svg';


const StyledItem = styled.li`
display: flex;
align-items: center;
padding-bottom: 5px;
`;

const StyledColumn = styled.span`
padding: 0 5px;
white-space: nowrap;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
a {
color: inherit;
}
width: ${(props) => props.width};
`;



const StyledButton = styled.button`
background: transparent;
border: 1px solid #171212;
padding: 5px;
cursor: pointer;
transition: all 0.1s ease-in;
&:hover {
background: #171212;
color: #ffffff;
}
`;


const StyledButtonSmall = styled(StyledButton)`
padding: 5px;
`;








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
    // <li className="item">
    // <li className={styles.item}>
    <StyledItem>

        {/* <span style={{ width: '40%' }}>  */}
        <StyledColumn width="40%">
            <a href={item.url}>{item.title}</a>
        </StyledColumn>
        
            
        {/* /</span> */}
             
        <StyledColumn width="30%" >{item.author} </StyledColumn>
        
        <StyledColumn width="10%" >{item.num_comments}</StyledColumn>
        
        <StyledColumn width="10%">{item.points}</StyledColumn>
        
        <StyledColumn width="10%">
            {/* <button type="button" onClick={() => onRemoveItem(item)} className="button button_small"> */}
            {/* <button type="button" onClick={() => onRemoveItem(item)} className={`${styles.button} ${styles.buttonSmall}`}> */}
            <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>  <Check height="18px" width="18px" /> </StyledButtonSmall>
            

        </StyledColumn>
        

    </StyledItem>
    
    
  );
  export default ListStories;
