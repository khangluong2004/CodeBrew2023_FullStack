import "./post.css";

export default function Post(
    {
        text,
        username,
        likes,
        handleLike
    }
) {
    return <div className="cb-card post-card">
        <p className="post-content">{text}</p>
        <hr/>
        <div className="post-actions">
            <div className="post-user">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
                <span className="cb-title">
                    {username}
                </span>
            </div>
            <div className="post-user">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-heart-fill" viewBox="0 0 16 16"
                     onClick={handleLike}>
                    <path fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                <span>
                    {likes}
                </span>
            </div>
        </div>
    </div>
}