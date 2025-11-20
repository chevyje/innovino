import Style from "./TextInput.module.css"

interface TextInputProps {
    label: string
    name: string
    type?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({ label, name, type = "text", value, onChange }: TextInputProps) {
    return (
        <div className={Style.inputGroup}>
            <p className={Style.tag}>{label}</p>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={Style.inputField}
            />
        </div>
    )
}
