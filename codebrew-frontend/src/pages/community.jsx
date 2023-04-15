import './community.css';
import {useContext, useEffect, useState} from "react";
import classNames from "classnames";
import Modal from "../components/modal.jsx";
import Post from "../components/post.jsx";
import Footer from "../components/footer.jsx";
import Recipe from "../components/recipe.jsx";
import {AuthContext, authPost} from "../lib/auth.js";
import {Navigate} from "react-router-dom";

const SAMPLE_TEXT = "this is some post Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non blandit massa enim nec.";
const SAMPLE_TEXT2 = `
this is some post Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie nunc non blandit massa enim nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis eu volutpat odio.
`;

function Posts() {
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const retrievePosts = async () => {
        try {
            const result = await authPost(
                '/chat/retrieve_post',
                {}
            );

            setPosts(result.map(res => ({
                text: res.post,
                username: res.username,
                likes: res.likes,
                date: res.date
            })));
        } catch (err) {
            console.log('cannot retrieve posts');
        }
    };
    useEffect(() => {
        retrievePosts();

    }, []);

    const {auth} = useContext(AuthContext);
    const [post, setPost] = useState('');
    const handlePost = async () => {
        try {
            const result = await authPost(
                '/chat/post',
                {
                    username: auth.username,
                    post: post,
                    date: '2023-04-15',
                    likes: 0
                }
            );

            if (result === false) {
                alert('toxic post, not posted');
                return;
            }

            setOpen(false);
            setPost('');
            await retrievePosts();
        } catch (err) {
            console.log('failed to post post');
        }
    }

    const handleLike = async id => {
        const post = posts[id];
        try {
            await authPost(
                '/chat/post',
                {
                    username: auth.username,
                    post: post.text,
                    date: '2023-04-15',
                    likes: post.likes + 1
                }
            );

            await retrievePosts();
        } catch (err) {
            console.log('failed to like post');
        }
    }

    return <div>
        <div>
            <button className="cb-button cb-button--text cb-button--icon"
                    onClick={() => setOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-plus" viewBox="0 0 16 16">
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Create Post
            </button>
        </div>
        <div className="posts-posts">
            {
                posts
                    .map((post, id) => (
                        <Post text={post.text}
                              likes={post.likes}
                              username={post.username}
                              handleLike={() => handleLike(id)}/>
                    ))
            }
        </div>

        <Modal open={open} handleClose={() => setOpen(false)}>
            <div className="posts-modal">
                <span className="posts-modal-title">Create Post</span>
                <hr/>
                <textarea className="cb-textinput posts-textinput"
                          placeholder="Share with the Community..."
                          value={post}
                          onChange={e => setPost(e.currentTarget.value)}/>
                <hr/>
                <div className="posts-modal-action">
                    <button className="cb-button"
                            onClick={handlePost}>Post
                    </button>
                    <button className="cb-button cb-button--outline"
                            onClick={() => setOpen(false)}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    </div>
}

const SAMPLE_RECIPE = {
    name: 'Food Name',
    cost: 5.2,
    ingredients: [
        'ingredient 1',
        'ingredient 2',
        'ingredient 3',
        'ingredient 4',
    ],
    username: 'User ID',
    likes: 99
};
const SAMPLE_RECIPES = Array.from({length: 10}).map(() => SAMPLE_RECIPE);

function Recipes() {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        try {
            const results = await authPost(
                '/chat/retrieve_recipe',
                {}
            );

            setRecipes(results.map((res, id) => ({
                name: res.name,
                username: res.username,
                ingredients: res.ingredients,
                instructions: res.instructions,
                likes: res.likes,
                cost: null,
            })));
        } catch (err) {
            console.log('failed to retrieve the recipes');
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

    const [redirect, setRedirect] = useState(false);

    return <div className="community-recipes">
        {redirect && <Navigate to="/recipes" />}
        <div className="community-recipes-action">
            <button className="cb-button cb-button--text cb-button--icon"
                    onClick={() => setRedirect(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-plus" viewBox="0 0 16 16">
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Post My Recipe
            </button>
        </div>
        <div className="community-recipes-list">
            {
                recipes.map(rec => (
                    <Recipe {...rec}>
                        <hr/>
                        <div className="community-recipes-list-details">
                            <div className="post-user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                </svg>
                                <span className="cb-title">
                                    {rec.username}
                                </span>
                            </div>
                            <div className="post-user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                                <span>
                                    {rec.likes}
                                </span>
                            </div>
                        </div>
                    </Recipe>
                ))
            }
        </div>
    </div>
}


export default function Community() {

    /// page handling
    const [page, setPage] = useState(0);
    const visitPage = index => {
        setPage(index);
        window.location.hash = index;
    }
    useEffect(() => {
        if (window.location.hash.length === 2) {
            visitPage(+window.location.hash[1]);
        } else {
            window.location.hash = '0';
        }
    }, []);


    return <div className="community-page">
        <h1 className="cb-page-title">Community</h1>
        <div className="community-pages">
            <button className={classNames("cb-button", {'cb-button--outline': page === 0})}
                    onClick={() => visitPage(0)}>Posts
            </button>
            <button className={classNames("cb-button", {'cb-button--outline': page === 1})}
                    onClick={() => visitPage(1)}>Recipes
            </button>
        </div>

        {
            [
                <Posts/>,
                <Recipes/>
            ][page]
        }

        <Footer/>
    </div>
}