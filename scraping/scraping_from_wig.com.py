import os
import re
import requests
import urllib.request
from bs4 import BeautifulSoup
import json
from tqdm import tqdm
from prettytable import PrettyTable


def get_image_urls(soup):
    image_urls = []
    product_media_list = soup.find(
        'ul', {'class': 'product__media-list grid grid--peek list-unstyled slider slider--mobile'})
    for index, product_media_item in enumerate(product_media_list.find_all('li', {'class': 'product__media-item grid__item slider__slide'})):
        img_tag = product_media_item.find('img')
        if img_tag and 'src' in img_tag.attrs:
            image_url = img_tag['src'].strip()
            if image_url.startswith('//'):
                image_url = 'https:' + image_url
            image_urls.append(image_url)
    return image_urls


def main():
    # Set the URL to scrape
    url = input('Enter the URL to scrape: ')

    # Send a request to the URL and get the HTML content
    response = requests.get(url)
    html_content = response.content

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the product title and description on the page
    title = soup.find('h1', {'class': 'product__title'}).text.strip()
    desc = soup.find('p', {'class': 'media__description'}).text.strip()

    # Find all image URLs inside ul tags with class "product__media-list"
    image_urls = get_image_urls(soup)

    # Create a directory with the name of the product
    folder_name = re.sub(r'\|', '', title).strip()
    folder_path = os.path.join('./scraping/Downloads', folder_name)
    os.makedirs(folder_path, exist_ok=True)

    # Download each image to the product folder
    for index, image_url in tqdm(enumerate(image_urls), desc='Downloading images', unit='image'):
        # Set the filename for the downloaded image
        filename = os.path.join(folder_path, f"{index+1}.jpg")

        # Download the image from the URL and save it to disk
        urllib.request.urlretrieve(image_url, filename)

    table = PrettyTable()
    table.align = 'l'  # Set the table alignment to left
    table.field_names = ['Attribute', 'Value']
    table.add_row(['Title', title])
    table.add_row(['Description', desc])
    table.add_row(['Image URLs', '\n'.join(image_urls)])

    # Create a dictionary to hold the product details and image URLs
    data = {'title': title, 'desc': desc, 'image': image_urls}

    # Save the product details and image URLs as a JSON file in the product folder
    with open(os.path.join(folder_path, 'data.json'), 'w') as f:
        json.dump(data, f)
        
    # Print the product details and image URLs in a table format
    print(table)

if __name__ == '__main__':
    main()
