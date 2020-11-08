var addToDo = (text) => {
  return {
    type: "ADD",
    data: text,
  };
};
var doneToDo = (data) => {
  return {
    type: "DONE",
    data: data,
  };
};
var hoverToDo = (data) => {
  return {
    type: "HOVER",
    data: data,
  };
};
var delToDo = (data) => {
  return {
    type: "DEL",
    data: data,
  };
};
var detailToDo = (data) => {
  return {
    type: "DETAIL",
    data: data,
  };
};
var loadToDo = (data) => {
  return {
    type: "LOAD",
    data: data,
  };
};
var mouseOutToDo = (data) => {
  return {
    type: "MOUSE_OUT",
    data: data,
  };
};
export const action = {
  addToDo,
  delToDo,
  detailToDo,
  loadToDo,
  doneToDo,
  hoverToDo,
  mouseOutToDo,
};

const initialState = {
  items: [
    // { id: 1, title: "Learn javascript" },
    // { id: 2, title: "Learn redux" },
    // { id: 3, title: "Lean react" }
  ],
  done: 0,
  undone: 0,
};
const initialStateDetal = {
  item: initialState.items[0],
};
class Todo {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      var newItem = new Todo(state.items.length + 1, action.data);
      return {
        items: [newItem, ...state.items],
      };
    case "DONE":
      var todoLists = Array.from(document.querySelectorAll(".todoList li"));
      let delItem = todoLists.find((todo) => {
        var content = todo.querySelector("p").innerText;
        return content === action.data;
      });
      delItem = delItem.querySelector("p");
      if (delItem.style.textDecoration === "line-through") {
        delItem.style.textDecoration = "none";
        state.done--;
        state.undone++;
        delItem.style.opacity = 1;
        //    delItem.style.color = 'black'
      } else {
        state.done++;
        state.undone--;
        delItem.style.opacity = 0.5;
        delItem.style.textDecoration = "line-through";
        //       delItem.style.color = 'green'
      }

      return {
        done: state.done,
        undone: state.undone,
        items: [...state.items],
      };
    case "LOAD":
      console.log("Action: ", action);
      return {
        items: action.data,
        done: 0,
        undone: action.data.length,
      };
    case "DEL":
      var todoLists = Array.from(document.querySelectorAll(".todoList li"));

      const delToIndex = todoLists.findIndex((todo) => {
        var content = todo.querySelector("p").innerText;

        return content === action.data;
      });
      
      if (todoLists[delToIndex].querySelector('p').style.textDecoration === "line-through")
        state.done--;
      else state.undone--;
      state.items.splice(delToIndex, 1);
      return {
        items: [...state.items],
        done: state.done,
        undone: state.undone,
      };
    case "HOVER":
      var todoLists = Array.from(document.querySelectorAll(".todoList li"));
      const hoverdItem = todoLists.find((todo) => {
        var content = todo.querySelector("p").innerText;
        return content === action.data;
      });

      hoverdItem.style.color = "red";

      return {
        done: state.done,
        undone: state.undone,
        items: [...state.items],
      };
    case "MOUSE_OUT":
      var todoLists = Array.from(document.querySelectorAll(".todoList li"));
      const mouseOutItem = todoLists.find((todo) => {
        var content = todo.querySelector("p").innerText;
        return content === action.data;
      });

      mouseOutItem.style.color = "black";

      return {
        done: state.done,
        undone: state.undone,
        items: [...state.items],
      };
    default:
      return state;
  }
};
export default reducer;
export const reducerDetail = (state = initialStateDetal, action) => {
  switch (action.type) {
    case "DETAIL":
      return {
        item: action.data,
      };

    default:
      return state;
  }
};
