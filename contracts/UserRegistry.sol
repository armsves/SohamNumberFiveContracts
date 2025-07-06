// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * @title UserRegistry
 * @dev Contract for storing and retrieving user profiles
 */
contract UserRegistry {
    struct User {
        string username;
        string profileUrl;
        bool isVerified;
        bool exists;
    }

    mapping(string => User) private users;
    mapping(address => string) private addressToUsername;
    
    event UserRegistered(string indexed username, address indexed userAddress, string profileUrl);
    event UserVerified(string indexed username, bool isVerified);
    event ProfileUpdated(string indexed username, string newProfileUrl);

    modifier onlyExistingUser(string memory _username) {
        require(users[_username].exists, "User does not exist");
        _;
    }

    modifier onlyUserOwner(string memory _username) {
        require(
            keccak256(abi.encodePacked(addressToUsername[msg.sender])) == 
            keccak256(abi.encodePacked(_username)),
            "Not the owner of this username"
        );
        _;
    }

    /**
     * @dev Register a new user
     * @param _username The username to register
     * @param _profileUrl The profile URL for the user
     */
    function registerUser(string memory _username, string memory _profileUrl) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(!users[_username].exists, "Username already exists");
        require(bytes(addressToUsername[msg.sender]).length == 0, "Address already has a username");

        users[_username] = User({
            username: _username,
            profileUrl: _profileUrl,
            isVerified: false,
            exists: true
        });

        addressToUsername[msg.sender] = _username;

        emit UserRegistered(_username, msg.sender, _profileUrl);
    }

    /**
     * @dev Fetch user information by username
     * @param _username The username to look up
     * @return username The user's username
     * @return profileUrl The user's profile URL
     * @return isVerified Whether the user is verified
     * @return exists Whether the user exists
     */
    function getUser(string memory _username) 
        external 
        view 
        returns (
            string memory username,
            string memory profileUrl,
            bool isVerified,
            bool exists
        ) 
    {
        User memory user = users[_username];
        return (user.username, user.profileUrl, user.isVerified, user.exists);
    }

    /**
     * @dev Check if a user exists
     * @param _username The username to check
     * @return Whether the user exists
     */
    function userExists(string memory _username) external view returns (bool) {
        return users[_username].exists;
    }

    /**
     * @dev Update profile URL (only by user owner)
     * @param _username The username to update
     * @param _newProfileUrl The new profile URL
     */
    function updateProfileUrl(string memory _username, string memory _newProfileUrl) 
        external 
        onlyExistingUser(_username) 
        onlyUserOwner(_username) 
    {
        users[_username].profileUrl = _newProfileUrl;
        emit ProfileUpdated(_username, _newProfileUrl);
    }

    /**
     * @dev Set verification status (only contract owner can verify users)
     * @param _username The username to verify/unverify
     * @param _isVerified The verification status
     */
    function setVerificationStatus(string memory _username, bool _isVerified) 
        external 
        onlyExistingUser(_username) 
    {
        // Note: You may want to add access control here (e.g., onlyOwner modifier)
        users[_username].isVerified = _isVerified;
        emit UserVerified(_username, _isVerified);
    }

    /**
     * @dev Get username by address
     * @param _address The address to look up
     * @return The username associated with the address
     */
    function getUsernameByAddress(address _address) external view returns (string memory) {
        return addressToUsername[_address];
    }
}