export interface IPost {
   id: number,
   userId: number,
   content: {
      text: string,
      img?: Base64URLString,
   },
   repostPostId?: number
}

export interface IUser {
   id: number,
   name: string,
   username: string,
   about: string,
   skills: string[],
   avatar?: Base64URLString,
   email: string,
   password: string,
}

export interface ILike {
   id: number,
   type: 'post' | 'comment',
   postId?: number,
   commentId?: number,
   userId: number
}

export interface IComment {
   id: number,
   postId: number,
   userId: number,
   text: string,
   replyId?: number,
}

export interface IReport {
   postId: number,
   userId: number,
   text: string,
}