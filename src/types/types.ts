export interface IPost {
   id: string,
   userId: string,
   createTimestamp: number,
   content: {
      text?: string,
      img?: string | ArrayBuffer,
   },
   repostPostId?: string
}

export interface IUser {
   id: string,
   name: string,
   username: string,
   about: string,
   skills: string[],
   avatar?: Base64URLString,
   email: string,
   password: string,
   isAdmin?: boolean
}

export interface ILike {
   id: string,
   postId?: string,
   commentId?: string,
   userId: string
}

export interface IComment {
   id: string,
   postId: string,
   userId: string,
   text: string,
   replyId?: string,
   createTimestamp: number,
}

export interface ICommentThree extends IComment {
   replyComment?: ICommentThree[],
   likes: number
}

export interface IReport {
   id: string,
   postId: string,
   userId: string,
   text: string,
}

export interface ISubscribers {
   id: string,
   fromUserId: string,
   toUserId: string
}