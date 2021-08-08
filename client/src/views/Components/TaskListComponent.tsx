import { useEffect, useState } from "react";

import UserModel, { TaskSchema, UserSchema } from "../../models/UserModel";
import { TaskItem } from "./TaskItemComponent";

export function TaskList(props: any) {
	const model = new UserModel();

	const [tasks, setTasks] = useState<TaskSchema[]>();

	const currentUser = JSON.parse(
		sessionStorage.getItem("currentUser")!
	) as UserSchema;

	useEffect(() => {
		if (tasks) return;

		let mounted = true;
		model.getTasks(currentUser._id!).then(async (data) => {
			if (mounted) setTasks(((await data.json()) as TaskSchema[]).slice(0, 3));
		});

		return () => {
			mounted = false;
		};
	});

	return (
		<>
			{tasks?.map((item, index) => {
				return <TaskItem key={index} task={item}></TaskItem>;
			})}
		</>
	);
}
