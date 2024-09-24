import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from './config/redux/reducers/todoSlice';
import { useForm } from "react-hook-form";

const App = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todo);

  const [editingId, setEditingId] = useState(null);

  const onSubmit = (data) => {
    if (editingId) {
      dispatch(updateTodo({ id: editingId, title: data.todoVal }));
      setEditingId(null);
    } else {
      dispatch(addTodo({ title: data.todoVal }));
    }
    setValue("todoVal", "");
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setValue("todoVal", item.title);
  };

  const deleteItemFromRedux = (id) => {
    dispatch(removeTodo({ id }));
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <input
            {...register("todoVal", { required: true })}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your todo"
          />
          {errors.todoVal && <span className="text-red-500">This field is required</span>}
        </div>

        <div className='text-center'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300">
            {editingId ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Todo</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 ? todos.map(item => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4 text-center">
                  <button 
                    onClick={() => startEditing(item)} 
                    className="text-blue-500 hover:text-blue-700 transition duration-300 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteItemFromRedux(item.id)} 
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="2" className='text-center py-4 text-gray-500'>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
