import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  CreateTaskAction,
  FindTaskAction,
  DeleteTaskAction,
  UpdateTaskAction,
} from "../../Action/TaskAction";
import { Modal, Table } from "antd";

function TaskPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getocaluserdata = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state?.User);
  const { taskData } = useSelector((state) => state?.task);

  const [Task, setTask] = useState();
  const [Requirement, setRequirement] = useState("Low");
  const [Status, setStatus] = useState("Pending");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const Createtask = async () => {
    const body = {
      task: Task,
      requirement: Requirement,
      status: Status,
      userId: getocaluserdata?.userId,
    };
    try {
      if (!Task || !Requirement) {
        return Swal.fire({
          title: "Warning",
          text: "All fields are required",
          icon: "warning",
        });
      }
      await dispatch(CreateTaskAction(body));
      await dispatch(FindTaskAction(user?.userId || getocaluserdata?.userId));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  const UpdateTask = async (id) => {
    const body = {
      task: Task,
      requirement: Requirement,
      status: Status,
      userId: getocaluserdata?.userId,
    };
    try {
      if (!Task || !Requirement) {
        return Swal.fire({
          title: "Warning",
          text: "All fields are required",
          icon: "warning",
        });
      }
      const result = await Swal.fire({
        title: "Are you sure? Update This Task",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Update",
      });
      if (result.isConfirmed) {
        await dispatch(UpdateTaskAction(id, body));
        await dispatch(FindTaskAction(user?.userId || getocaluserdata?.userId));

        Swal.fire({
          title: "Deleted!",
          text: "Task deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (user || getocaluserdata)
      dispatch(FindTaskAction(getocaluserdata.userId));
  }, [user]);

  console.log("getocaluserdata : ", getocaluserdata);

  const requirementOptions = [
    { code: "Low", value: "Low" },
    { code: "Medium", value: "Medium" },
    { code: "High", value: "High" },
    { code: "Urgent", value: "Urgent" },
  ];
  const statusOptions = [
    { code: "Pending", value: "Pending" },
    { code: "Working", value: "Working" },
    { code: "Complete", value: "Complete" },
  ];

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Task will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await dispatch(DeleteTaskAction(id));
      await dispatch(FindTaskAction(getocaluserdata.userId));

      Swal.fire({
        title: "Deleted!",
        text: "Task deleted successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Task",
      dataIndex: "Task",
      key: "Task",
    },
    {
      title: "Requirment",
      dataIndex: "Requirment",
      key: "Requirment",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <span
          className={
            status === "Complete"
              ? "bg-green-400  p-2 rounded-sm , "
              : status === "Working"
                ? "bg-yellow-400  p-2 rounded-sm "
                : "bg-red-600  p-2 rounded-sm"
          }
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleDelete(record.key)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => {
              setSelectedTaskId(record.key);
              setTask(record.Task);
              setRequirement(record.Requirment);
              setStatus(record.Status);
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
      ),
    },
  ];

  // const dataSource = [
  //   { key: 1, id: 1, Requirment: "Snow", Task: "Jon", Status: 35 },
  //   { key: 2, id: 2, Requirment: "Lannister", Task: "Cersei", Status: 42 },
  // ];
  const dataSource = useMemo(() => {
    const mappedData =
      taskData?.ListData?.map((item, index) => ({
        key: item.taskId,
        id: index + 1,
        Task: item.task,
        Requirment: item.requirement,
        Status: item.status,
      })) || [];

    return mappedData.filter(
      (item) =>
        item.Task.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Requirment.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Status.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [taskData, searchText]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex  justify-center px-4 ">
        <div className="bg-white shadow-2xl rounded-2xl p-8  w-full">
          <h2 className="text-3xl font-bold  text-blue-600 mb-6">Add Task</h2>
          <div className="w-full justify-between gap-1 flex  ">
            {/* <div> */}
            <input
              placeholder=" Enter Your task "
              value={Task}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2  focus:ring-blue-500"
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <select
              value={Requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-2xl border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {requirementOptions.map((item) => (
                <option key={item.code} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
            {/* </div> */}
            {/* <div> */}
            <button
              className=" border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 bg-blue-800 focus:ring-blue-500"
              onClick={Createtask}
            >
              <span className="text-amber-50">Add</span>
            </button>
            {/* </div> */}
          </div>
          <div className="px-4 py-6 w-full overflow-x-auto">
            <input
              type="text"
              placeholder="Search Task..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
        <Modal
          title="Update Task"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={async () => {
            await UpdateTask(selectedTaskId);
            setIsModalOpen(false);
          }}
        >
          <div className="space-y-4">
            <input
              value={Task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter Task"
            />

            <select
              value={Requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full border p-2 rounded"
            >
              {requirementOptions.map((item) => (
                <option key={item.code} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>

            <select
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border p-2 rounded"
            >
              {statusOptions.map((item) => (
                <option key={item.code} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default TaskPage;
