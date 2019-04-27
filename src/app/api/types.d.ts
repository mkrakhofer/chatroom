interface User {
    id: string;
    name: string;
}

interface Message {
    id: string;
    userId: string;
    content: string;
    dateTime: Date;
}

declare module "react-notifications";