

import { Application } from 'express';
import request from 'supertest';
import { Post } from '../src/types/DBtypes';


const getPosts = (url: string | Application): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query GetAllPosts {
          posts {
            id
            title
            item_name
            description
            category
            filename
            owner {
              id
              user_name
            }
            tags {
              id
              label
            }
            location {
              type
              coordinates
            }
          }
        }
        }`,
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const posts = response.body.data.posts;
          expect(posts).toBeInstanceOf(Array);
          posts.forEach((post: Post) => {
            expect(post).toHaveProperty('id');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('description');
            expect(post.owner).toHaveProperty('email');
            expect(post.owner).toHaveProperty('id');
            expect(post.owner).toHaveProperty('user_name');
          });
          resolve(posts);
        }
      });
  });
};