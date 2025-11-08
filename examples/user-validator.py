"""
User Validator Example

This example demonstrates how GitHub Copilot can help with input validation
and error handling patterns in Python.
"""

import re
from typing import Dict, List, Optional

class ValidationError(Exception):
    """Custom exception for validation errors"""
    pass

def validate_email(email: str) -> bool:
    """
    Validate email address format
    Returns True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password: str) -> Dict[str, bool]:
    """
    Validate password strength
    Returns a dictionary with validation criteria results
    """
    return {
        'min_length': len(password) >= 8,
        'has_uppercase': any(c.isupper() for c in password),
        'has_lowercase': any(c.islower() for c in password),
        'has_digit': any(c.isdigit() for c in password),
        'has_special': any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password)
    }

def is_password_strong(password: str) -> bool:
    """
    Check if password meets all strength requirements
    """
    checks = validate_password(password)
    return all(checks.values())

def validate_username(username: str) -> bool:
    """
    Validate username format
    Must be 3-20 characters, alphanumeric with underscores
    """
    pattern = r'^[a-zA-Z0-9_]{3,20}$'
    return re.match(pattern, username) is not None

def validate_phone_number(phone: str) -> bool:
    """
    Validate phone number format
    Accepts formats: (123) 456-7890, 123-456-7890, 1234567890
    """
    # Remove common separators
    cleaned = re.sub(r'[\s\-\(\)]', '', phone)
    # Check if it's 10 digits
    return cleaned.isdigit() and len(cleaned) == 10

def validate_age(age: int) -> bool:
    """
    Validate age is within acceptable range (13-120)
    """
    return isinstance(age, int) and 13 <= age <= 120

def validate_url(url: str) -> bool:
    """
    Validate URL format
    """
    pattern = r'^https?://(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(/.*)?$'
    return re.match(pattern, url) is not None

def validate_user_data(data: Dict) -> List[str]:
    """
    Validate complete user data and return list of errors
    """
    errors = []
    
    # Check required fields
    required_fields = ['username', 'email', 'password', 'age']
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")
    
    if 'username' in data and not validate_username(data['username']):
        errors.append("Invalid username format")
    
    if 'email' in data and not validate_email(data['email']):
        errors.append("Invalid email address")
    
    if 'password' in data and not is_password_strong(data['password']):
        errors.append("Password does not meet strength requirements")
    
    if 'age' in data and not validate_age(data['age']):
        errors.append("Invalid age")
    
    if 'phone' in data and data['phone'] and not validate_phone_number(data['phone']):
        errors.append("Invalid phone number format")
    
    if 'website' in data and data['website'] and not validate_url(data['website']):
        errors.append("Invalid URL format")
    
    return errors

def sanitize_input(text: str) -> str:
    """
    Sanitize user input by removing potentially dangerous characters
    """
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove potentially dangerous characters
    text = re.sub(r'[<>&"\']', '', text)
    # Trim whitespace
    text = text.strip()
    return text

# Example usage
if __name__ == "__main__":
    print("User Validator Examples:\n")
    
    # Test email validation
    print("Email Validation:")
    print(f"  test@example.com: {validate_email('test@example.com')}")
    print(f"  invalid.email: {validate_email('invalid.email')}")
    
    # Test password validation
    print("\nPassword Validation:")
    weak_password = "password"
    strong_password = "SecurePass123!"
    print(f"  '{weak_password}': {validate_password(weak_password)}")
    print(f"  '{strong_password}': {validate_password(strong_password)}")
    
    # Test complete user validation
    print("\nComplete User Validation:")
    valid_user = {
        'username': 'john_doe',
        'email': 'john@example.com',
        'password': 'SecurePass123!',
        'age': 25
    }
    invalid_user = {
        'username': 'a',
        'email': 'invalid',
        'password': 'weak'
    }
    
    print(f"  Valid user errors: {validate_user_data(valid_user)}")
    print(f"  Invalid user errors: {validate_user_data(invalid_user)}")
