class Database {
    public static users: Users;
}

type BaseEntity = {
    id: number
}

type UserEntity = {
    name: string,
    password: string
} & BaseEntity


class Users {
    private data: UserEntity[] = [];
}

class TopUpRequests {

}

export default Database;