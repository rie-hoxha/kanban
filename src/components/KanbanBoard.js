import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';


export default function KanbanBoard() {
  // two columns, Incomplete and Complete
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);


  //using the json placeholder to get the fake data

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);


  
  //the handleDragFunction whoch basically handels the relocation. it deletes task from the origin and pushes it to new column
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // eslint-disable-next-line eqeqeq
    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY
    // eslint-disable-next-line eqeqeq
    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    // eslint-disable-next-line eqeqeq
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

  function findItemById(id, array) {
    // eslint-disable-next-line eqeqeq
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    // eslint-disable-next-line eqeqeq
    return array.filter((item) => item.id != id);
  }


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column", // Column layout
          alignItems: "center", // Center horizontally
          minHeight: "100vh", // Ensure full viewport height
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "30px", marginTop: "40px" }}>Kanban Board</h2>


        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Column title={"To-Do"} tasks={incomplete} id={"1"} isFirst={true} />
          <Column title={"Done"} tasks={completed} id={"2"} />
          <Column title={"Backlog"} tasks={[]} id={"3"} isLast={true} />

          {/* Add more columns as needed */}
        </div>
      </div>
    </DragDropContext>
  );
}
