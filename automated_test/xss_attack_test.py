from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import re
import requests

# Set up the Selenium WebDriver
driver = webdriver.Chrome("./chromedriver")

try:
    # Navigate to the signup form page
    driver.get('http://localhost:3000/user/SignUp')

    # Find the input fields and fill them in
    firstname_field = driver.find_element(By.NAME, 'firstname')
    firstname_field.send_keys('John<script>alert("xss");</script>')

    lastname_field = driver.find_element(By.NAME, 'lastname')
    lastname_field.send_keys('<b>bold</b>')

    username_field = driver.find_element(By.NAME, 'username')
    username_field.send_keys('<i>italic</i>')

    email_field = driver.find_element(By.NAME, 'email')
    email_field.send_keys('$({sdfsdf})johndoe@example.com')

    password_field = driver.find_element(By.NAME, 'password')
    password_field.send_keys('password11111')

    confirm_password_field = driver.find_element(By.NAME, 'confirmPassword')
    confirm_password_field.send_keys('password11111')

    # Click the submit button
    submit_button = driver.find_element(By.XPATH, '//button[@type="submit"]')
    submit_button.click()

    # Check if the input fields were sanitized
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    firstname_value = soup.find('input', {'name': 'firstname'}).get('value')
    assert '<script>' not in firstname_value, 'XSS attack not sanitized in firstname'

    lastname_value = soup.find('input', {'name': 'lastname'}).get('value')
    assert '<b>' not in lastname_value, 'HTML tags not sanitized in lastname'

    username_value = soup.find('input', {'name': 'username'}).get('value')
    assert '<i>' not in username_value, 'HTML tags not sanitized in username'

    email_value = soup.find('input', {'name': 'email'}).get('value')
    assert email_value == 'johndoe@example.com', 'Email address was modified'

    password_value = soup.find('input', {'name': 'password'}).get('value')
    assert password_value == '', 'Password was not cleared'

    confirm_password_value = soup.find('input', {'name': 'confirmPassword'}).get('value')
    assert confirm_password_value == '', 'Confirm password was not cleared'

    # Check if the server received sanitized input
    response = requests.get('http://localhost:3000/api/auth/user_signup')
    users = response.json()

    user = [u for u in users if u['username'] == username_value][0]

    assert user['firstname'] == 'John', 'XSS attack not sanitized in firstname on the server'

    assert user['lastname'] == 'bold', 'HTML tags not sanitized in lastname on the server'

    assert user['username'] == 'italic', 'HTML tags not sanitized in username on the server'

finally:
    # Close the browser
    driver.quit()
