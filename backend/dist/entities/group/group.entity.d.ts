import Groupuser from '../groupuser/groupuser.entity';
import Message from '../message/message.entity';
export declare class Group {
    id: number;
    owner: string;
    password: string;
    users: Groupuser[];
    messages: Message[];
}
export default Group;
