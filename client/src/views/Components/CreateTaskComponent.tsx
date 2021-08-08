import { createRef } from "react";
import "./CreateTaskComponent.scss";
import PlusButton from "./../../assets/Plus_button.png";

import UserModel, { UserSchema } from "../../models/UserModel";

export function CreateTask(props: any) {
	const model = new UserModel();
	const newTaskRef = createRef<HTMLInputElement>();

	async function addNewTask() {
		const { _id: userId } = JSON.parse(
			sessionStorage.getItem("currentUser")!
		) as UserSchema;

		await model.addTask(userId!, newTaskRef.current?.value!);

		newTaskRef.current!.value = "";
		props.onTaskAdded();
	}

	return (
		<div className="new-task">
			<img onClick={addNewTask} src={PlusButton} alt="" />

			<input
				ref={newTaskRef}
				type="text"
				name="task-detail"
				placeholder="New task..."
			/>
		</div>
	);
}
