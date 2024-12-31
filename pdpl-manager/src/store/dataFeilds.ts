const dataFields = [
    // Personal Information
    { name: "firstName", type: "personal", description: "User's first name." },
    { name: "lastName", type: "personal", description: "User's last name." },
    { name: "middleName", type: "personal", description: "User's middle name, if applicable." },
    { name: "email", type: "personal", description: "User's email address." },
    { name: "phoneNumber", type: "personal", description: "User's phone number." },
    { name: "birthDate", type: "personal", description: "User's date of birth." },
    { name: "gender", type: "personal", description: "User's gender identity." },
    { name: "profilePicture", type: "personal", description: "URL or file path of the user's profile picture." },
  
    // Contact Details
    { name: "addressLine1", type: "contact", description: "Primary line of user's address." },
    { name: "addressLine2", type: "contact", description: "Secondary line of user's address." },
    { name: "city", type: "contact", description: "City of residence." },
    { name: "state", type: "contact", description: "State or province of residence." },
    { name: "country", type: "contact", description: "Country of residence." },
    { name: "postalCode", type: "contact", description: "Postal or ZIP code." },
  
    // Marketing Fields
    { name: "preferences", type: "marketing", description: "User preferences for products or services." },
    { name: "subscriptionStatus", type: "marketing", description: "Email subscription status." },
    { name: "campaignInteractions", type: "marketing", description: "History of interactions with campaigns." },
    { name: "socialMediaHandles", type: "marketing", description: "User's social media usernames or profiles." },
  
    // Analytics Fields
    { name: "activityLogs", type: "analytics", description: "Tracks user activity on the platform." },
    { name: "purchaseHistory", type: "analytics", description: "Record of user's purchases." },
    { name: "feedback", type: "analytics", description: "User-provided feedback or reviews." },
    { name: "referralSource", type: "analytics", description: "How the user discovered the platform." },
    { name: "deviceInfo", type: "analytics", description: "Information about the user's device and OS." },
    { name: "browserInfo", type: "analytics", description: "Details of the user's web browser." },
    { name: "IPaddress", type: "analytics", description: "User's IP address for tracking and security." },
  
    // Functional Fields
    { name: "username", type: "functional", description: "Unique identifier for the user." },
    { name: "passwordHash", type: "functional", description: "Hashed password for user authentication." },
    { name: "securityQuestions", type: "functional", description: "Set of questions for account recovery." },
    { name: "accountStatus", type: "functional", description: "Current status of the user account." },
    { name: "roles", type: "functional", description: "Roles assigned to the user (e.g., admin, editor)." },
  
    // Compliance Fields
    { name: "consentTimestamp", type: "compliance", description: "Timestamp of when user consent was given." },
    { name: "termsAgreement", type: "compliance", description: "Indicates whether the user agreed to terms." },
    { name: "ageVerification", type: "compliance", description: "Age confirmation for compliance purposes." },
    { name: "governmentId", type: "compliance", description: "Government-issued ID for verification." },
  
    // Security Fields
    { name: "twoFactorAuth", type: "security", description: "Two-factor authentication status." },
    { name: "loginHistory", type: "security", description: "History of user logins." },
    { name: "failedLoginAttempts", type: "security", description: "Count of failed login attempts." },
    { name: "passwordResetToken", type: "security", description: "Token for password reset functionality." },
  
    // Miscellaneous Fields
    { name: "customAttributes", type: "miscellaneous", description: "Any custom fields added by the user or system." },
    { name: "languagePreference", type: "miscellaneous", description: "Preferred language of the user." },
    { name: "timezone", type: "miscellaneous", description: "User's time zone." },
    { name: "profileCompletion", type: "miscellaneous", description: "Percentage of user profile completion." }
  ];
  
  export default dataFields;
  