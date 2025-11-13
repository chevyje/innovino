import Style from "./test.module.css"
import Button from "../components/Button/Button.tsx";

export default function TestPage() {
    return (
        <div className={Style.container}>
            <Button title={"Button"}></Button>
        </div>
    );
}
