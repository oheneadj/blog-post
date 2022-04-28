import React from 'react'

const Posts = ( {posts} ) => {
  return (
    <div className="px-10">
        <h1>List of posts</h1>
        {posts.map((post) => (
        <div className="py-5 ">
            <h1>{post.title}</h1>
            <h3>{post.author} - <small >{post.published_date}</small> {" "}</h3>
            <p>{post.content}</p>
        </div>
            ))}
    </div>
  )
}

export default Posts

export async function getServerSideProps(){
    // fetching takes place
    const res = await fetch("http://localhost:4000/posts");
    const posts = await res.json()

    return {props:{posts,},}
}