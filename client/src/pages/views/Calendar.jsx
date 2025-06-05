import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const Calendar = () => {
  const [taskPool, setTaskPool] = useState([
    { id: "task-1", content: "Finish UI for Dashboard" },
    { id: "task-2", content: "Research new AI tools" },
    { id: "task-3", content: "Sync with backend" },
  ]);

  const [planner, setPlanner] = useState({
    morning: [],
    afternoon: [],
    evening: [],
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList =
      source.droppableId === "taskPool" ? taskPool : planner[source.droppableId];
    const destinationList =
      destination.droppableId === "taskPool"
        ? taskPool
        : planner[destination.droppableId];

    const [movedTask] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedTask);

    if (source.droppableId === "taskPool") setTaskPool([...sourceList]);
    else setPlanner({ ...planner, [source.droppableId]: [...sourceList] });

    if (destination.droppableId === "taskPool") setTaskPool([...destinationList]);
    else setPlanner({ ...planner, [destination.droppableId]: [...destinationList] });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        📅 Daily Planner
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Pool */}
          <Droppable droppableId="taskPool">
            {(provided) => (
              <div
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-3">
                  📝 Task Pool
                </h3>
                <ul className="space-y-2">
                  {taskPool.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm cursor-grab"
                        >
                          {task.content}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>

          {/* Planner */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-3">
              🗓️ Today’s Plan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["morning", "afternoon", "evening"].map((slot) => (
                <Droppable key={slot} droppableId={slot}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[100px]"
                    >
                      <p className="text-sm font-medium mb-2 capitalize">{slot}</p>
                      {planner[slot].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-2 bg-white dark:bg-gray-600 mb-2 rounded shadow-sm cursor-grab"
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Calendar;
