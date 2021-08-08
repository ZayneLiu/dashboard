import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { TaskItem } from "./Components/TaskItemComponent";
import { CreateTask } from "./Components/CreateTaskComponent";

import "./Task.scss";
import "antd/dist/antd.css";
import UserModel, { TaskSchema, UserSchema } from "../models/UserModel";
import { message } from "antd";

// const { Column } = Table;

export function Tasks(props: any) {
	const history = useHistory();
	const model = new UserModel();

	let currentUser = JSON.parse(
		sessionStorage.getItem("currentUser")!
	) as UserSchema;

	const [tasks, setTasks] = useState<TaskSchema[]>();

	useEffect(() => {
		if (tasks) return;

		model.getTasks(currentUser._id!).then(async (data) => {
			setTasks(await data.json());
		});
	});

	function getTasks() {
		message.loading({ content: "adding task...", key: "addTask" }, 0);
		model.getTasks(currentUser._id!).then(async (data) => {
			setTasks(await data.json());
			message.success({ content: "added", key: "addTask" }, 0);
		});
	}

	return (
		<div className="tasks-page router-view">
			<p className="title">Tasks</p>
			<button
				onClick={() => {
					history.push("/");
				}}>
				Back to Dashboard
			</button>
			<div className="task-list">
				{tasks?.map((task, index) => {
					return <TaskItem key={index} task={task} />;
				})}

				<CreateTask onTaskAdded={getTasks}></CreateTask>
			</div>
		</div>
	);
}
