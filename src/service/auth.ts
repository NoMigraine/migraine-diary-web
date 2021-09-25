export default (requestKit: (url: string, config?: any) => any) => {
    return {
        login: requestKit('/no-magraine-service/login').get
    }
}