import Post from "./post.interface.js";
import postModel from "./post.model.js";
import LikeModel from "../like/like.model.js";
import Like from "../like/like.interface.js";
import Comment from "../comment/comment.interface.js";
import commentModel from "../comment/comment.model.js";
import { ObjectId } from "mongodb";

export default class PostService {
  public async createPost(body: object): Promise<Post> {
    const post: Post = await postModel.create(body);
    return post;
  }

  public async updatePost(
    body: object,
    postId: string,
    userId: string
  ): Promise<Post | null> {
    const post: Post = await postModel.findOneAndUpdate(
      { _id: postId, createdBy: userId },
      { ...body },
      { new: true, runValidators: true }
    );
    if (!post) {
      return null;
    } else {
      return post;
    }
  }

  public async incrementViews(postId: string): Promise<void> {
    const post: Post = await postModel.findById(postId);
    post.views++;
    await postModel.findByIdAndUpdate(postId, post);
  }

  public async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = await postModel
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "postId",
            as: "likes",
          },
        },
      ])
      .sort({ createdAt: -1 });
    return posts;
  }

  public async likePost(body: any): Promise<Like | null> {
    const post = await this.getPost(body.postId);

    if (!post) {
      return null;
    } else {
      const like: Like = await LikeModel.create(body);

      return like;
    }
  }

  public async getPost(id: string): Promise<Post | null> {
    const post: Post = await postModel.findById(id);

    if (!post) {
      return null;
    }

    return post;
  }

  public async addComment(body: any): Promise<Comment> {
    console.log(body);
    const comment: Comment = await commentModel.create(body);
    return comment;
  }

  public async getComments(id: string): Promise<Comment[]> {
    // const comments: Comment[] = await commentModel.find({ postId: postId });
    const comments: Comment[] = await commentModel.aggregate([
      { $match: { postId: new ObjectId(id) } },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "commentId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "replyUser",
          foreignField: "_id",
          as: "replyUser",
        },
      },
    ]);

    return comments;
  }

  public async getPostWithCategory(category: string): Promise<Post[]> {
    const posts: Post[] = await postModel
      .aggregate([
        {
          $match: { category: category },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "postId",
            as: "likes",
          },
        },
      ])
      .sort({ createdAt: -1 });
    return posts;
  }
}
