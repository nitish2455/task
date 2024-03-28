import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useStore } from "@/stores/StoreProvider";

interface EditTaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string; // New prop for assignee
  priority: string; // New prop for priority
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditTask = ({
  id,
  title,
  description,
  status,
  assignee,
  priority,
  open,
  setOpen,
}: EditTaskProps) => {
  const { taskStore } = useStore();
  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const [newStatus, setNewStatus] = useState<string>(status);
  const [newAssignee, setNewAssignee] = useState<string>(assignee); // New state for assignee
  const [newPriority, setNewPriority] = useState<string>(priority); // New state for priority
  const [error, setError] = useState<string>();

  const handleEditedTask = (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (newDescription.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else if (!newStatus) {
      setError("Please select a status for the task");
    } else if (!newAssignee) { // Validate assignee
      setError("Please select an assignee for the task");
    } else if (!newPriority) { // Validate priority
      setError("Please select a priority for the task");
    } else {
      const editedTask = {
        title: newTitle,
        description: newDescription,
        status: newStatus,
        assignee: newAssignee, 
        priority: newPriority, 
      };

      taskStore.editTask(id, editedTask);

      // Reset the input values
      setNewTitle("");
      setNewDescription("");
      setNewStatus("");
      setNewAssignee("");
      setNewPriority("");
      setError("");
      setOpen(!open);
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Task</DialogTitle>
        <DialogDescription>
          Edit or Update Your Task here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedTask}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="name"
              className="text-left"
            >
              Title
            </Label>
            <Input
              id="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="description"
              className="text-left"
            >
              Description
            </Label>
            <Textarea
              id="description"
              rows={5}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="status"
              className="text-left"
            >
              Status
            </Label>
            <Select
              value={newStatus}
              onValueChange={setNewStatus}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="deployed">Deployed</SelectItem>
                  
              </SelectContent>
            </Select>
          </div>
          {/* New fields for assignee and priority */}
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="assignee"
              className="text-left"
            >
              Assignee
            </Label>
            <Input
              id="assignee"
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              placeholder="Assignee"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <Label
              htmlFor="priority"
              className="text-left"
            >
              Priority
            </Label>
            <Select
              value={newPriority}
              onValueChange={setNewPriority}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Task Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p0">P0</SelectItem>
                <SelectItem value="p1">P1</SelectItem>
                <SelectItem value="p2">P2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <p className="text-center py-1 rounded bg-error-background text-error-foreground">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditTask;
