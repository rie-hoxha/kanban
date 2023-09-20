import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import "./scroll.css";
import Task from './Task';

const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 300px;
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 10px 20px;
  background-color: #E1E2FF;
  font-size: 16px;
  font-weight: bold;
  color: #32286A;
  border-radius: 20px;
  bottom: 10px;
  display: inline-block;
  margin-right: 70%; /* Add margin-right: auto to push the title to the left */
  margin-top: 50px;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
  return (
    <div>
      <Title>{title}</Title>
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