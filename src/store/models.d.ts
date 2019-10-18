
import { IrregularVerb } from './models.d';

export interface User {
    id: number | null;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}


export interface UserProfile {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}



export interface UserSubmit {
    username: string;
    password: string;
}

export interface UserResponse {
    username: string;
    userFirstName: string;
    token: string;
}

// export interface UserForCreateOrUpdate {
//     // id: number;
//     username: string;
//     password: string;
//     email: string;
//     firstName: string;
//     lastName: string;


// }






export interface IrregularVerb {
    id: number;
    infinitive: string;
    transcriptionInfinitive: string;
    pastTense: string;
    transcriptionPastTense: string;
    pastParticiple: string;
    transcriptionPastParticiple: string;
    translation: string;
    isLearnt: boolean;
}

export interface IrregularVerbsResponse {
    // irregularVerbs?: IrregularVerb [] | null; // check why to use "?' and null
    irregularVerbs: IrregularVerb[]; // check why to use "?' and null
    //  IrregularVerbsCount: number;
}



// export interface User {
//     email: string;
//     token: string;
//     username: string;
//     bio?: string;
//     image?: string;
// }


// export interface UserForUpdate {
//     email?: string
//     username?: string
//     bio?: string
//     password?: string
//     image?: string
// }

export interface ArticlePreview {
    id: number;
    title: string;
    description: string;
}
// export interface Article {
//     slug: string;
//     title: string;
//     description: string;
//     body: string;
//     tagList?: (string)[] | null;
//     createdAt: string;
//     updatedAt: string;
//     favorited: boolean;
//     favoritesCount: number;
//     author: Author;
// }
// export interface Author {
//     username: string;
//     bio: string;
//     image: string;
//     following: boolean;
// }
// export interface IrregularVerbSubmit {
//     irregularVerb: string;
//     password: string;
// }





// export interface ProfileResponse {
//     profile: Profile;
// }

// export interface ArticlesResponse {
//     articles?: (Article)[] | null;
//     articlesCount: number;
// }
