import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Avatar } from "antd";

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
`;

const TextContent = styled.div``;

const Icons= styled.div`
display: flex;
justify-content: end;
padding: 2px;
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
      : "#EAF4FC";
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
                <span>
                  <small>
                    #{task.id}{" "}
                  </small>
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <TextContent>{task.title}</TextContent>
              </div>
              <Icons>
                <div>
                  <Avatar
                    // onclick={()=> console.log(task)}
                    src={"https://joesch.moe/api/v1/random?key=" + task.id}
                  ></Avatar>
                </div>
              </Icons>
            </div>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    );
  }
  