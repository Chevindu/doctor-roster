import { FC, useState } from "react"
import "./MemberForm.css"

type MemberFormProps = {
    defaultFormValues: {
        title: string;
        description?: string;
        color?: string;
    }
    onChange?: (newValues: { [id: string]: string }) => void
    onSubmit?: (newValues: { [id: string]: string }) => void
    onCancel?: () => void
}

const MemberForm: FC<MemberFormProps> = ({ defaultFormValues, onChange, onSubmit, onCancel }) => {

    const [formValues, setFormValues] = useState<any>({ ...defaultFormValues });

    const handleNewMemberFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit?.(formValues);
        setFormValues(defaultFormValues);
    }
    
    const handleNewMemberFormCancel = (e: any) => {
        e.preventDefault();
        onCancel?.();
        setFormValues(defaultFormValues);
    }

    const handleFieldChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newStore = { ...formValues, [id]: e.target.value };
        setFormValues(newStore);
        onChange?.(newStore);
    }

    return <form onSubmit={handleNewMemberFormSubmit} name="addMemberForm" className="member-form">

        <label className="form-label" htmlFor="title">Name:<input type="text" className="form-item" id="title" required={true} value={formValues.title} onChange={(e) => handleFieldChange("title", e)} /></label>

        <label className="form-label" htmlFor="description">Description:<textarea className="form-item" id="description" value={formValues.description} onChange={(e) => handleFieldChange("description", e)} /></label>

        <label className="form-label" htmlFor="color">Color:<input type="color" className="form-item" id="color" value={formValues.color} onChange={(e) => handleFieldChange("color", e)} /></label>

        <div className="action-container">
            <button value="add" type="submit" className="action primary-action">Add</button>
            <button value="cancel" className="action" onClick={handleNewMemberFormCancel}>Cancel</button>
        </div>
    </form>
}

export default MemberForm