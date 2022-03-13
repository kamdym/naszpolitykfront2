export class CommentModel {
  constructor(
    public content: string,
    public parentId: number,
    public articleId: number,
    public firstName: string,
    public id: number,
    public sentiment: number
  ) {
  }
}
