import React from "react";

// CONSTANTS
const BASE_URL = 'http://localhost:3000';

export const AuthContext = React.createContext(null);

export async function authRegister(details) {
    // return '';
    // details: {username, password, email}
    let response;
    try {
        response = await fetch(
            `${BASE_URL}/user/register`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(details),
            }
        );
    } catch (err) {
        throw "[fetch error] " + err.toString().toLowerCase();
    }

    if (!response.ok) {
        throw "[response error] " + response.status;
    }
}

export async function authLogin(details) {
    // // mock
    // return '';
    // details: {username, password}
    let response;

    try {
        response = await fetch(
            `${BASE_URL}/user/login`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(details),
            }
        );
    } catch (err) {
        throw "[fetch error] " + err.toString().toLowerCase();
    }

    if (!response.ok) {
        throw "[response error] " + response.status;
    }

    return (await response.json()).token;
}

export async function authPost(
    path,  // url
    body,  // post data
) {
    let response;
    try {
        response = await fetch(
            `${BASE_URL}/api${path}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(body)
            }
        );
    } catch (err) {
        throw "[fetch error] " + err.toString().toLowerCase();
    }

    if (!response.ok) {
        // unauthenticated, return null
        if (response.status === 401) {
            return null;
        }
        throw "[response error]" + response.status;
    }

    return await response.json();
}