// Proxies
import { createUser } from "../../proxies/user";
import { uploadImage } from "../../proxies/profile";

// Types
import * as Request from "../../types/Request";
import * as Profile from "../../types/Profile";

////////////////////////////////////////////////////////////

const retrieveFileFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const fileName: string = file.name;

    return { file, fileName };
};

const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    route: string
) => {
    const { file, fileName } = retrieveFileFromInput(e);
    const fd = new FormData();
    fd.append("file", file, fileName);

    try {
        const uploadResp = await uploadImage(route, fd);
        console.log(uploadResp);
    } catch (err) {
        console.error(err);
    }
};

const handleAccountCreation = async (
    details: Request.Payload.CreateUser
): Promise<Profile.Instance> => {
    try {
        const returnedUserProfile = await createUser(details);

        return Promise.resolve(returnedUserProfile);
    } catch (err) {
        return Promise.reject(err);
    }
};

////////////////////////////////////////////////////////////

export { handleImageUpload, handleAccountCreation };
