import type {LoginRequest} from "../models/user_model.ts";
import {getHeaders, baseUrl} from "../utils/requests.ts";

export function auth (user: LoginRequest) {
    const headers: Headers = getHeaders()

    const request: RequestInfo = new Request(`${baseUrl}/users/auth`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    })

    // Return something that the frontend can use
    return fetch(request).then(res => res.json()).then((data) => alert(JSON.stringify(data)))
}