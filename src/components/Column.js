import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import "./scroll.css";
import Task from './Task';


const Container = styled.div`
  background-color: #F8F8F8;
  width: 350px;
  height: 360px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => (props.isFirst ? '10px 0 0 10px' : '')}
               ${(props) => (props.isLast ? '0 10px 10px 0' : '')};

`;


// Update the Title component to apply the appropriate class based on the title

const Title = styled.h3`
  padding: 10px 20px;
  background-color: #E1E2FF;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  bottom: 10px;
  display: inline-block;
  margin-right: 70%;
  margin-top: 30px;
  
  &.title-todo {
    color: #32286A; /* Text color for "To-Do" */
    background-color: #E1E2FF;
  }

  &.title-done {
    color: #710A0B; /* Text color for "Done" */
    background-color: #FBC8C4;
  }

  &.title-backlog {
    color: #6E3500; /* Text color for "Backlog" */
    background-color: #FFEEB6;
  }
};
`;


const TaskList = styled.div`
  margin: 20px 10px;
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #F8F8F8;
  flex-grow: 1;
  min-height: 100px;
`;




  export default function Column({ title, tasks, id, isFirst, isLast }) {
    // Define a className based on the title
    const titleClassName = `title-${title.toLowerCase()}`;
  
    return (
      <div>
        {/* Apply the className to the Title component */}
        <Title className={titleClassName}>{title}</Title>
        <Container className={`column`} isFirst={isFirst} isLast={isLast}>
          <Droppable droppableId={id}>
            {(provided, snapshot) => (
              <TaskList 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              >
                {/* Your tasks will go here */}
                {
                  tasks.map((task, index)=> (<Task
                    key={index}
                    index={index}
                    task={task}
                  />
                  ))
                }
  
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      </div>
    );
  }
  