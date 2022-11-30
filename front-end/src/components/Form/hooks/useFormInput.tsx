import { useState } from "react";

type TextInputTypes = HTMLInputElement | HTMLTextAreaElement;
type FormEvent = React.FormEvent<TextInputTypes>;

interface IFormInputReturn {
    value: string;
    onChange: (e: FormEvent) => void;
}

const useFormInput = (str: string): IFormInputReturn => {
    const [value, setValue] = useState<string>(str);

    ////////////////////////////////////////////////////////////

    const handleInputChange = (e: FormEvent) => setValue(e.currentTarget.value);

    ////////////////////////////////////////////////////////////

    return {
        value,
        onChange: handleInputChange,
    };
};

export default useFormInput;
