import React, { useState, useEffect, useHistory } from 'react';
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
    // const [profilePicture, setProfilePicture] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // Fetch profile data through get request
            const response = await fetch('/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }
            const data = await response.json();
            setProfileData(data.profile);

            // Fetch saved pets
            const savedPetsResponse = await fetchSavedPets();
            if (!savedPetsResponse.ok) {
                throw new Error('Failed to fetch saved pets');
            } 
            const savedPetsData = await savedPetsResponse.json();
            setSavedPets(savedPetsData);
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Redirect to login page or handle error accordingly
            history.push('/login');
        }
    };

    const updateProfile = async () => {
        try {
            const response = await fetch(`/profile/$profileData.id/update`, {
                method: 'PUT',
                header: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            if (response.ok) {
                // Profile updated successfully
                fetchProfile(); // Refresh profile data
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const changePassword = async () => {
        try {
            const response = await fetch(`/profile/$profileData.id/change-password`, {
                method: 'PUT',
                header: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, newPassword }),
            });

            if (response.ok) {
                // Password changed successfully
                setPassword();
                setNewPassword('');
            } else {
                console.error('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing profile:', error);
        }
    };

    const fetchSavedPets = async (userId) => {
        try {
            const response = await fetch(`/users/$userId}/saved-pets`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch saved pets');
            }
            const data = await response.json();
            return data.savedPets;
        } catch (error) {
            console.error('Error fetching saved pets', error);
            throw error;
        }
    };

    const handleFavorite = async (petId) => {
        try {
            const response = await fetch(`/users/$profileData.id}/favorite/${petId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to favorite pet');
            }
            //Refresh saved pets list after favoriting
            fetchProfile();
        } catch (error) {
            console.error('Error favoriting pet:', error);
        }
    };

    // const handleFileChange = (event) => {
    //     // Handle file change...
    //     const file = event.target.files[0];
    //     setProfilePicture(file);
    // };

    // const handleUploadProfilePicture = async () => {
    //     try {
    //         // Create FormData object to send the file
    //         const formData = new FormData();
    //         formData.append('profilePicture', profilePicture);

    //         const response = await fetch('/upload-profile-picture', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             },
    //         });

    //         if (response.ok) {
    //             console.log('Profile picture uploaded successfully');
    //         } else {
    //             console.error('Failed to upload profile picture');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading profile picture:', error);
    //     }
    // };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // Logout successful, navigate to the logout success page
                localStorage.removeItem('token'); // Clear token from localStorage
                history.push('/logout-success');
            } else {
                // Handle logout failure
                console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {/* <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadProfilePicture}>Upload Profile Picture</button> */}
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
            <input
                type='text'
                placeholder='New Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='email'
                placeholder='New Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={updateProfile}>Update Profile</button>
            <br />
            <input
                type='password'
                placeholder='Current Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type='password'
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={changePassword}>Change Password</button>
            <br />
            <button onClick={handleLogout}>Logout</button>

            {/* Display saved pets */}
            <div>
                <h2>Saved Pets</h2>
                <ul>
                    {savedPets.map((pet) => {
                        return(
                        <li key={pet.id}>
                            <img src={pet.photos} alt={pet.name}/>
                            <p>Name: {pet.name}</p>
                            <p>Species: {pet.species}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Description: {pet.description}</p>
                            <p>Status: {pet.status}</p>
                            <button onClick={() => handleFavorite(pet.id)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
