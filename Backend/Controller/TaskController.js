import Task from "../Model/TaskSchema.js";

export const CreateTask = async (req, res) => {
  try {
    const { task, requirement, status, userId } = req.body;

    const NewTask = await Task.create({
      task,
      requirement,
      status,
      userId,
    });
    res.status(201).json({
      success: true,
      NewTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletetask = await Task.findByIdAndDelete(id);

    if (!deletetask) {
      return res.status(404).json({
        sucess: false,
        message: "Task Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      deletetask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const FindTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const ListTask = await Task.find({ userId });
    const ListData = ListTask.map((item) => ({
      taskId: item._id,
      task: item.task,
      requirement: item.requirement,
      status: item.status,
      userId: item.userId,
    }));
    res.status(200).json({
      success: true,
      datalength: ListTask.length,
      ListData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, requirement, status, userId } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        task,
        requirement,
        status,
        userId,
      },
      { new: true }, // returns updated document
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
