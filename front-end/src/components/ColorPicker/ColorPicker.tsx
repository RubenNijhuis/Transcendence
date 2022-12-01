import { CirclePicker } from 'react-color'
import { Container } from './ColorPicker.style';

const colors = [
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
]

interface Iinput {
    color: string;
    handler: Function;
}

const ColorPicker = ({ color, handler }: Iinput): JSX.Element => {

    return (
        <Container>
            <CirclePicker
                colors={colors}
                width="100%"
                color={color}
                onChangeComplete={(value) => handler(value.hex)}
            />
        </Container>
    );
}

export default ColorPicker;