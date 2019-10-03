// import axios from 'axios';
import {
    UserForCreateOrUpdate,
    Profile,
    ProfileResponse,
    UserResponse,
    UserSubmit,
} from './models';

import axios from 'axios';
import usersStore from './modules/usersStore';
import { ArticlePreview } from './models.d';

export const learnEnglishApi = axios.create({
    baseURL: 'http://localhost:8075/api',
});


// export async function getGlobalFeed() {
//     const response = await conduitApi.get('/articles');
//     return response.data as ArticlesResponse;
// }
// export async function downLoadIrregularVerbs(): Promise<IrregularVerbsResponse> {
//     const response = await learnEnglishApi.get('/api/content/iv');
//     return response.data as IrregularVerbsResponse;
// }


export async function downLoadArticlePreviews(topic: string): Promise<ArticlePreview[]> {
    const response = await learnEnglishApi.get(`/content/articles/${topic}`);
    // const response = await learnEnglishApi.get(`/content/articles/${topic}');
    // alert('setarticlePreviewsGeneral = ' + (response.data as ArticlePreview[]).length);
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


export async function downLoadUserProfile() {
    return await learnEnglishApi.get('/users/profiles');
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


export function setJWT(jwt: string) {
    // alert('setJWT ' + jwt);
    learnEnglishApi.defaults.headers.common.Authorization = `Bearer_${jwt}`;
}

export function deleteJWT() {
    learnEnglishApi.defaults.headers.common.Authorization = ``;
}


export async function loginUser(userSubmit: UserSubmit): Promise<UserResponse> {
    const response = await learnEnglishApi.post('/auth/login', userSubmit);
    return response.data as UserResponse;
}

export async function registerUser(userForCreateOrUpdate: UserForCreateOrUpdate): Promise<UserResponse> {
    const response = await learnEnglishApi.post('/auth/register', userForCreateOrUpdate);
    return response.data as UserResponse;
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
