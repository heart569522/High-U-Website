import requests
from bs4 import BeautifulSoup
from tabulate import tabulate


def get_image_urls(soup):
    image_urls = []
    product_media_list = soup.find('ul', {'class': 'product__media-list grid grid--peek list-unstyled slider slider--mobile'})
    for product_media_item in product_media_list.find_all('li', {'class': 'product__media-item grid__item slider__slide'}):
        img_tag = product_media_item.find('img')
        if img_tag and 'src' in img_tag.attrs:
            image_url = img_tag['src'].strip()
            if image_url.startswith('//'):
                image_url = 'https:' + image_url
            image_urls.append(image_url)
    return image_urls


def main():
    # Ask the user for the URL to scrape
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

    # Create a list of lists to hold the product details and image URLs
    data = [['Title', title], ['Description', desc], ['Image URLs', '\n'.join(image_urls)]]

    # Print the product details and image URLs in a table format
    print(tabulate(data, headers=['Attribute', 'Value'], tablefmt='grid'))


if __name__ == '__main__':
    main()
