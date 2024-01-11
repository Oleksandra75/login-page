import { Link } from 'react-router-dom';
import classes from '../todoList.module.css';

const ListView = ({ posts }) => (
   <div>
      {posts.map((post) => (
         <div className={classes['container']} key={post.id}>
            <Link to={`/posts/${post.id}`} className={classes['post-link']}>
               <h2 className={classes['title']} >{post.title}</h2>
            </Link>
         </div>
      ))}
   </div>
);

export default ListView