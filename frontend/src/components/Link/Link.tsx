import Style from "./button.module.css"

interface Props {
    title?: string,
    action?: any;
}

export default function Button({ title, action }: Props) {
    const btnTitle : string = title ?? "Link"
    const classes = `${Style.button}`;
    return (
        <div className={Style.buttonContainer}>
            <a className={`${classes}`} onClick={action}>{btnTitle}</a>
        </div>
    );
}
