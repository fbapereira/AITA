/**
 * Posts on Reddit
 */
export class Article {
  /**
   * post's id
   */
  id: string;

  /**
   * post's author
   */
  author: string;

  /**
   * post creation date
   */
  created: Date;

  /**
   * post content
   */
  selftext: string;

  /**
   * post main line
   */
  title: string;

  /**
   * reason between up vote and down votes
   */
  upvote_ratio: number;

  /**
   * post's comments number
   */
  num_comments: number;

  /**
   * post's main image
   */
  imageUrl: string;

  /** link to the post at reddit */
  permalink: string;
}
