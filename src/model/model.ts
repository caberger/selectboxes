import { User } from "../user/user"

export interface Model {
    readonly availableUsers: User[]
    readonly selectedUsers: User[]
}

