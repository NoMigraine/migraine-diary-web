import axios from 'axios'
import auth from './auth'
import notes from './notes'

let requestKit = (api: string, config = { params: null }) => ({
    get(params: any) {
        config.params = params;
        return axios.get(api, config);
    },
    post(params: any) {
        return axios.post(api, params, config);
    },
    put(params: any) {
        return axios.put(api, params, config);
    },
    patch(params: any) {
        return axios.patch(api, params, config);
    },
})

export const notesService = notes(requestKit)
// export const authService = auth(requestKit)