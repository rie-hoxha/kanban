import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import "./scroll.css";
import Task from './Task';


const Container = styled.div`
  background-color: #F8F8F8;
  border-radius: 2.5px;
  width: 350px;
  border-radius: 20px;
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  // border: 1px solid gray;
  display: flex;
  flex-direction: column;
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
  margin-top: 50px;
  
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


export default function Column({ title, tasks, id }) {
  // Define a className based on the title
  const titleClassName = `title-${title.toLowerCase()}`;

  return (
    <div>
      {/* Apply the className to the Title component */}
      <Title className={titleClassName}>{title}</Title>
      <Container className='column'>
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