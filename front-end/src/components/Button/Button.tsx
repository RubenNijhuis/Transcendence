import { StyledButton } from "./Button.style";

interface Props {
    theme?: string;
    className?: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = ({ theme, children, className, onClick }: Props) => {
    let fullClassName = "button";

    if (className) fullClassName += ` ${className}`;

    return (
        <StyledButton theme={theme} onClick={onClick} className={fullClassName}>
            {children}
        </StyledButton>
    );
};

export default Button;
