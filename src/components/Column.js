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
`;

const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
  background-color: lightblue;
  position: sticky;
  top: 0;
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
    <Container className='column'>
      <div>
        <Title>{title}</Title>
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
      </div>
    </Container>
  );
}
