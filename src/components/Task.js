import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon


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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add the box-shadow property */
`;

const TextContent = styled.div`
color: #686B72;
`;

const BinIcon= styled.div`
display: flex;
justify-content: end;
padding: 2px;
cursor:pointer;

`;

const TaskId = styled.span`
  color: #333; /* Make the task ID text bold */
  font-weight: bold;
`;
// function below checks/ controls the color of the tasks
//is the item being dragged,if yes then lightgreen color
//
function bgcolorChange(props) {
    return props.isDragging
      ? "lightgreen"
      : props.isDraggable
      ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacklog
      ? "#F2D7D5"
      : "#FFFFFF";
  }

export default function Task({ task, index }) {
    return (
      <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
                <TaskId>
                  <small>
                    #{task.id}{" "}
                  </small>
                </TaskId>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <TextContent>{task.title}</TextContent>
              </div>
              <BinIcon>
                <div>
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              </BinIcon>
            </div>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    );
  }
  