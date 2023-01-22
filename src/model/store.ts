import { BehaviorSubject } from "rxjs"
import { Model } from "./model"

const initialState: Model = {
    availableUsers: [],
    selectedUsers: []
}

const store = new BehaviorSubject<Model>(initialState)
export default store