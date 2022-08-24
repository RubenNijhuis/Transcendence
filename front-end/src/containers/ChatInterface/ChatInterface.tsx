import {Container} from './ChatInterface.style'

interface Props {
    children: React.ReactNode;
}

const ChatInterface = ({ children }: Props) => (
    <Container>
        {children}
    </Container>
)

export default ChatInterface;