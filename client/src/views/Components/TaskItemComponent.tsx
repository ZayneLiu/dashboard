import { createRef, useEffect, useState } from "react";
import UserModel, { TaskSchema } from "../../models/UserModel";

import "./TaskItemComponent.scss";
export function TaskItem(props: any) {
	const model = new UserModel();
	const { task: _task }: { task: TaskSchema } = props;

	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [task, setTask] = useState<TaskSchema>(_task);

	const editInputRef = createRef<HTMLInputElement>();

	useEffect(() => {
		if (task === _task || !isEdit) return;

		const { _id, ...rest } = task;
		console.log(rest);

		let mounted = false;
		model.updateTask(_id!, rest).then((task) => {
			if (mounted) setTask(task);
		});

		return () => {
			mounted = false;
		};
	});

	useEffect(() => {
		if (!isEdit) return;

		editInputRef.current?.focus({});
		editInputRef.current!.value = task.task!;
	});

	function taskCheckboxOnclick(e: any) {
		const target = e.target as HTMLDivElement;
		const isDone = target.classList.contains("checked");
		const { completed, ...rest } = task;

		if (isDone) setTask({ ...rest, completed: false });
		else setTask({ ...rest, completed: true });
	}

	const switchToEdit = () => setIsEdit(true);

	function inputOnBlur() {
		setIsEdit(false);

		model
			.updateTask(task._id!, { task: editInputRef.current?.value })
			.then((json) => setTask(json));
	}

	return (
		<div className="task-item">
			<div className="task" onClick={switchToEdit}>
				{isEdit ? (
					<input ref={editInputRef} onBlur={inputOnBlur}></input>
				) : (
					task?.task
				)}
			</div>
			<div
				onClick={taskCheckboxOnclick}
				className={[
					"task-checkbox",
					task?.completed ? "checked" : "unchecked",
				].join(" ")}>
				&#x02713;
			</div>
		</div>
	);
}
