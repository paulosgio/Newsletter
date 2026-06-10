import { UsersRepository } from "./users.repository.js";

export class UserService {

    private repository: UsersRepository

    constructor(repository: UsersRepository) {
        this.repository = repository
    }

    async subscribeService(id: string) {
        try {
            return await this.repository.subscribe(id)
        } catch (error) {
            throw error
        }
    }

    async unsubscribeService(id: string) {
        try {
            return await this.repository.unsubscribe(id)
        } catch (error) {
            throw error
        }
    }

    async findSubscribersService() {
        try {
            return await this.repository.findSubscribers()
        } catch (error) {
            throw error
        }
    }

    async meService(id: string) {
        try {
            return await this.repository.me(id)
        } catch (error) {
            throw error
        }
    }
}