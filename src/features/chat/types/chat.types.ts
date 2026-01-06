export type ChatMessage={
    _id?:string;
    content:string;
    senderId:string;
    recieverId:string;
    conversationId:string;
    createdAt?:string
}

export type Chatlist={
     _id:string;
    content:string;
    receiver:{
        _id:string;
        name:string;
        email?:string;
        profilePictureUrl?:string;
    };
   lastMessage:string;
   lastMessageAt:string;
}