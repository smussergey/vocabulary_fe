// import axios from 'axios';
import {
    UserResponse,
    UserSubmit,
    UserProfile,
    User,
} from './models';

import axios from 'axios';
import usersStore from './modules/usersStore';
import { ArticlePreview } from './models.d';

export const learnEnglishApi = axios.create({
    baseURL: 'http://localhost:8075/api',
});


// learnEnglishApi.interceptors.request.use((config) => {
//     // perform a task before the request is sent
//     // tslint:disable-next-line: no-console
//     console.log('Request was sent');

//     return config;
// }, (error) => {
//     // handle the error
//     alert(error);
//     return Promise.reject(error);
// });



export function setJWT(jwt: string) {
    // alert('setJWT ' + jwt);
    learnEnglishApi.defaults.headers.common.Authorization = `Bearer_${jwt}`;
}

export function deleteJWT() {
    learnEnglishApi.defaults.headers.common.Authorization = ``;
}


export async function registerUser(user: User): Promise<UserResponse> {
    const response = await learnEnglishApi.post('/auth/register', user);
    return response.data as UserResponse;
}

export async function loginUser(userSubmit: UserSubmit): Promise<UserResponse> {
    const response = await learnEnglishApi.post('/auth/login', userSubmit);

    return response.data as UserResponse;
}


export async function downLoadUserProfile(): Promise<UserProfile> {
    const response = await learnEnglishApi.get('/users/profile');
    return response.data as UserProfile;
}

export async function updateUserProfile(userProfile: UserProfile): Promise<any> {
    const response = await learnEnglishApi.put('/users/profile', userProfile);
    return response;
}








export async function downLoadArticlePreviews(topic: string): Promise<ArticlePreview[]> {
    const response = await learnEnglishApi.get(`/content/articles/${topic}`);
    return response.data as ArticlePreview[];
}

export async function addIrregularVerbToLearnt(id: number) {
    return await learnEnglishApi.post(`/users/iv/${id}`);
}

export async function removeIrregularVerbFromLearnt(id: number) {
    return await learnEnglishApi.delete(`/users/iv/${id}`);
}

export async function downLoadIrregularVerbsAll() {
    return await learnEnglishApi.get('/content/iv');
}



// export async function downLoadUserProfile() {
//     const webApiUrl = 'http://localhost:8075/api/content/users/profiles';
//     const tokenStr = usersStore.token;

//     return axios.get(webApiUrl, { headers: { Authorization: `Bearer_${tokenStr}` } });
// }


// export async function fetchProfile(): Promise<Profile> {
//     // const response = await learnEnglishApi.get(`users/profiles/${username}`);
//     const response = await learnEnglishApi.get('/users/profiles');
//     return (response.data as ProfileResponse).profile;
// }









export async function uploadFileToServer(formData: FormData): Promise<string> {
    const response = await learnEnglishApi.post('/admin/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data as string;
}

// export async function fetchProfile(username: string): Promise<Profile> {
//     const response = await learnEnglishApi.get(`/profiles/${username}`);
//     return (response.data as ProfileResponse).profile;
// }


// export async function fetchUser(): Promise<User> {
//     const response = await conduitApi.get('/user')
//     return (response.data as UserResponse).user
// }
// export async function fetchUser(): Promise<User> {
//     const response = await learnEnglishApi.get('/user');
//     return (response.data as UserResponse).user;
// }



// export async function updateUser(user: UserForUpdate): Promise<User> {
//     const response = await conduitApi.put('/user', user)
//     return (response.data as UserResponse).user
// }
// export async function updateUser(user: UserForUpdate): Promise<User> {
//     const response = await learnEnglishApi.put('/user', user);
//     return (response.data as UserResponse).user;
// }
