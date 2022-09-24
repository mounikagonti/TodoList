import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodoTasks,
  postTodoTasks,
  deleteTodoTasks,
  putTodoTasks,
  patchTodoTasks,
} from "../../redux/todoSlice/TodoSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdModeEdit, MdDelete } from "react-icons/md";
import TextError from "../textError/TextError";

const TodoList = () => {
  const { todoData } = useSelector((state: any) => state.todo);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState<any>({});
  const [isEditButtonEnabled, setIsEditButtonEnabled] =
    useState<boolean>(false);

  const initialValues = {
    task: "",
    isCompleted: false,
  };

  const submitFormValues = (values: any) => {
    if (isEditButtonEnabled) {
      dispatch(putTodoTasks(values));
      setEditData({});
      setIsEditButtonEnabled(false);
    } else {
      values.isCompleted = false;
      dispatch(postTodoTasks(values));
    }
  };

  const validationSchema = Yup.object({
    task: Yup.string().required("Required"),
  });

  const handleOnChange = (id: number, e: any) => {
    const todoInfo = {
      id: id,
      isCompleted: e.currentTarget.checked,
    };
    dispatch(patchTodoTasks(todoInfo));
  };

  useEffect(() => {
    dispatch(getTodoTasks());
  }, []);

  return (
    <>
      <Formik
        initialValues={editData || initialValues}
        onSubmit={submitFormValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <div className="form_wrapper">
            <div className="form-control">
              <label className="task" htmlFor="task">
                Task
              </label>
              <br />
              <Field className="field" type="text" id="task" name="task" />
              <ErrorMessage name="task" component={TextError} />
            </div>
            <button className="submit_btn" type="submit">
              {isEditButtonEnabled ? "update & submit" : "Submit"}
            </button>
          </div>
        </Form>
      </Formik>

      <div className="todo_wrapper">
        {todoData?.map((item: any) => (
          <div className="todo_item" key={item?.id}>
            <input
              className="checkbox"
              type="checkbox"
              onChange={(e) => {
                handleOnChange(item?.id, e);
              }}
              checked={item?.isCompleted}
            />
            <p
              className={
                item?.isCompleted ? "todo_msg completed_task" : "todo_msg"
              }
            >
              {item?.task}
            </p>
            <button
              className="btn1"
              onClick={() => {
                setEditData(item);
                setIsEditButtonEnabled(true);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              className="btn2"
              onClick={() => dispatch(deleteTodoTasks(item?.id))}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
