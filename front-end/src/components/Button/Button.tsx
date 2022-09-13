import { StyledButton } from "./Button.style";

interface Props {
    theme?: string;
    className?: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = ({ theme, children, className, onClick }: Props) => (
    <StyledButton theme={theme} onClick={onClick} className={className}>
        {children}
    </StyledButton>
);

export default Button;
