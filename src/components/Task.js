import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${(props) => bgcolorChange(props)};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TextContent = styled.div`
  color: #686B72;
  cursor: pointer;
`;

const BinIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2px;
  cursor: pointer;
`;

const TaskId = styled.span`
  color: #333;
  font-weight: bold;
`;

const EditIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  cursor: pointer;
`;

const EditInput = styled.input`
  border: none;
  outline: none;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  background-color: transparent;
  color: inherit;
  width: 100%; /* Add this line to make the input field take the full width */
  margin-top: 10%; /* Add this line to remove any margins */
  padding: 0; /* Add this line to remove any padding */
`;


function bgcolorChange(props) {
  return props.isDragging
    ? "#CBDFD8"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#FFFFFF";
}

export default function Task({ task, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    task.title = editedContent;
  };



  const handleContentClick = () => {
    setIsEditing(true);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleContentKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    }
  };

  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
            <div>
              <EditInput
                type="text"
                value={editedContent}
                onChange={handleContentChange}
                onKeyPress={handleContentKeyPress}
                onBlur={handleSaveClick}
                autoFocus
              />
            </div>
          ) : (
            <div>
              <EditIcon onClick={handleEditClick}>
                <FontAwesomeIcon icon={faEdit} />
              </EditIcon>
              <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                <TaskId>
                  <small>
                    #{task.id}{" "}
                  </small>
                </TaskId>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <TextContent onClick={handleContentClick}>{editedContent}</TextContent>
              </div>
              <BinIcon>
                <div>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </BinIcon>
            </div>
          )}
        </Container>
      )}
    </Draggable>
  );
}
