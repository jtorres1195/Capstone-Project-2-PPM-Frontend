import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import './UserProfile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [savedPets, setSavedPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const url = 'https://perfect-pet-match-backend-server.onrender.com/userProfile'; // Use a constant for the URL
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setProfileData(data.profile);
            const petsResponse = await fetch(`${url}/saved-pets`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!petsResponse.ok) throw new Error('Failed to fetch saved pets');
            const petsData = await petsResponse.json();
            setSavedPets(petsData);
        } catch (error) {
            console.error('Error fetching profile:', error);
            navigate('/login');
        }
    };

    const updateProfile = async () => {
        const updateUrl = `http://localhost:3001/profile/${profileData.userId}/update`;
        try {
            const response = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            fetchProfile(); // Refresh profile data
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const changePassword = async () => {
        const changePasswordUrl = `http://localhost:3001/profile/${profileData.userId}/change-password`;
        try {
            const response = await fetch(changePasswordUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, newPassword }),
            });
            if (!response.ok) throw new Error('Failed to change password');
            setPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const handleFavorite = async (petId) => {
        const favoriteUrl = `http://localhost:3001/users/${profileData.id}/favorite/${petId}`;
        try {
            const response = await fetch(favoriteUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to favorite pet');
            fetchProfile(); // Refresh saved pets list
        } catch (error) {
            console.error('Error favoriting pet:', error);
        }
    };

    const handleLogout = async () => {
        const logoutUrl = 'http://localhost:3001/logout';
        try {
            const response = await fetch(logoutUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Logout failed');
            localStorage.removeItem('token'); // Clear token from localStorage
            navigate('/logout-success');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
            <input type="text" placeholder="New Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="New Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={updateProfile}>Update Profile</button>
            <br />
            <input type="password" placeholder="Current Password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <button onClick={changePassword}>Change Password</button>
            <br />
            <button onClick={handleLogout}>Logout</button>
            <div>
                <h2>Saved Pets</h2>
                <ul>
                    {savedPets.map(pet => (
                        <li key={pet.id}>
                            <img src={pet.photos} alt={pet.name} />
                            <p>Name: {pet.name}</p>
                            <p>Species: {pet.species}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Description: {pet.description}</p>
                            <p>Status: {pet.status}</p>
                            <button onClick={() => handleFavorite(pet.id)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
