from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up the Selenium WebDriver
driver = webdriver.Chrome("./chromedriver")

try:
    # Navigate to the signup form page
    driver.get('http://localhost:3000/user/SignUp')

    # Find the input fields and fill them in
    firstname_field = driver.find_element(By.NAME, 'firstname')
    firstname_field.send_keys('John')

    lastname_field = driver.find_element(By.NAME, 'lastname')
    lastname_field.send_keys('Doe')

    username_field = driver.find_element(By.NAME, 'username')
    username_field.send_keys('johndoe')

    email_field = driver.find_element(By.NAME, 'email')
    email_field.send_keys('johndoe@example.com')

    password_field = driver.find_element(By.NAME, 'password')
    password_field.send_keys('password11111')

    confirm_password_field = driver.find_element(By.NAME, 'confirmPassword')
    confirm_password_field.send_keys('password0000')

    # Click the submit button
    submit_button = driver.find_element(By.XPATH, '//button[@type="submit"]')
    submit_button.click()

    # Wait for the success message to appear
    wait = WebDriverWait(driver, 10)
    success_message = wait.until(EC.presence_of_element_located((By.ID, 'success')))
    print(success_message.text)

finally:
    # Close the browser
    driver.quit()