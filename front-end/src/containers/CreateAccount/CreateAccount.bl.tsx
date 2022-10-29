// Proxies
import { createUser } from "../../proxies/user";
import { uploadImage } from "../../proxies/profile";

// Types
import { CreateUserParams } from "../../types/request";
import { ProfileType } from "../../types/profile";

////////////////////////////////////////////////////////////

const retrieveFileFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const fileName: string = file.name;

    return { file, fileName };
};

const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    route: string
) => {
    const { file, fileName } = retrieveFileFromInput(e);
    const fd = new FormData();
    fd.append("file", file, fileName);

    uploadImage(route, fd).then(console.log).catch(console.log);
};

const handleAccountCreation = async (
    details: CreateUserParams
): Promise<ProfileType> => {
    try {
        const returnedUserProfile = await createUser(details);

        return Promise.resolve(returnedUserProfile);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { handleImageUpload, handleAccountCreation };
