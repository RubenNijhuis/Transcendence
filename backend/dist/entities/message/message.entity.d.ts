import Group from '../group/group.entity';
export declare class Message {
    id: number;
    group: Group;
    createdDate: Date;
    content: string;
    content_type: number;
    sender: number;
    read_by: string;
}
export default Message;
