import React, { useState, useEffect } from 'react';

function GitHubUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://api.github.com/users/${searchTerm}?fields=bio,location`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }
  }, [searchTerm]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <img src={user.avatar_url} alt={user.login} />
          <p>{user.bio}</p>
          <p>{user.location}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubUsers;
