export default (requestKit: (url: string, config?: any) => any) => {
    return {
        getNotes: requestKit('/no-migraine-service/notes').get
    }
}