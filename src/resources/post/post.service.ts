import Post from "./post.interface.js";
import postModel from "./post.model.js";
import LikeModel from "../like/like.model.js";
import Like from "../like/like.interface.js";

export default class PostService {
  public async createPost(body: object): Promise<Post> {
    const post: Post = await postModel.create(body);
    return post;
  }

  public async getAllPosts(): Promise<Post[]> {
    const posts: Post[] = await postModel.aggregate([
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
    ]);
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

  private async getPost(id: string): Promise<Post | null> {
    const post: Post = await postModel.findById(id);

    if (!post) {
      return null;
    }

    return post;
  }
}