import { BASE_URL } from "../service"
import { User } from "./user"

interface UserResponse {
    users: [User]
}
class UserService {
    async getAll(): Promise<User[]> {
        const url = `${BASE_URL}/users.json`
        const response = await fetch(url)
        const userResponse: UserResponse = await response.json()
        return userResponse.users
    }
}

const userService = new UserService()
export default userService