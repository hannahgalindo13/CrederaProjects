import './style.css';
import { getProfileData } from '../../services/profile';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const ProfilePosts = () => {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfileData,
  });

  if (isLoading) {
    return (
      <section id="profile-posts">
        <h2 className="page-heading-2">Pinned Posts</h2>
        <div className="profile-post-results">
          <div className="content-card fade-in">
            <div className="post-author">
              <div className="post-author-avatar loading"></div>
              <div className="post-author-info">
                <div className="skeleton-block skeleton-block--half loading"></div>
                <div className="skeleton-block skeleton-block--quarter loading"></div>
              </div>
            </div>
            <div className="post-content skeleton-block loading"></div>
          </div>
        </div>
      </section>
    );
  }

  const { pinnedPost } = data;

  return (
    <section id="profile-posts">
      <h2 className="page-heading-2">Pinned Posts</h2>
      <div className="profile-post-results">
        <div className="content-card">
          <div className="post-author fade-in">
            <div className="post-author-avatar fade-in">
                {pinnedPost.authorFirstName[0]}
                {pinnedPost.authorLastName[0]}
            </div>
            <div className="post-author-info fade-in">
              <p className="page-paragraph">
                {pinnedPost.authorFirstName} {pinnedPost.authorLastName}
              </p>
              <p className="page-micro">
                {pinnedPost.jobTitle} @ {pinnedPost.companyName}
              </p>
            </div>
          </div>
          <p className="page-body post-content fade-in">
            {expanded
              ? pinnedPost.post
              : `${pinnedPost.post.slice(0, 150)}${pinnedPost.post.length > 150 ? '...' : ''}`}
          </p>
          <button
            className="post-expand-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
          <br></br>
          <p className="page-micro post-location">
            {pinnedPost.city}, {pinnedPost.state}
          </p>
          <p className="page-micro post-date">
            {new Date(pinnedPost.publishDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
};
