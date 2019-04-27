interface User {
    id: string;
    name: string;
}

interface Message {
    id: string;
    user: User;
    content: string;
}

declare module "react-notifications";