import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


const Card = ({ cardId, cardIndex, card, updateLists }) => {
  
  return (
    <Draggable
      draggableId={`${cardId}`}
      index={cardIndex}
      key={cardIndex}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
        >
          <h5>{card.title}</h5>
          <p>{card.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
