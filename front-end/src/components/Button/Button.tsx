import { StyledButton } from "./Button.style";

interface Props {
    theme?: string;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Button = ({ theme, children, onClick }: Props) => (
    <StyledButton theme={theme} onClick={onClick}>
        {children}
    </StyledButton>
);

export default Button;
