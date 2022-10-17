import { useState } from "react";

interface FileInterface {
    file: File;
    fileName: string;
}

interface IFileInputReturn {
    value: FileInterface;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const useFileInput = (): IFileInputReturn => {
    const [value, setValue] = useState<FileInterface>(null!);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const returnedFile: File = (target.files as FileList)[0];
        const fileName: string = returnedFile.name;

        setValue({
            file: returnedFile,
            fileName
        });
    };

    return {
        value,
        onChange: handleInputChange
    };
};

export default useFileInput;
