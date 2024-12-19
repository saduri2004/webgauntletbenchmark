import json
import requests
import time

API_KEY = "228b3197f584b7634f1efc14e25d84b19f5805ff5009386eaa0cf1fc0d401ac1"
API_ENDPOINT = "https://serpapi.com/search.json"

def get_image_urls(query, api_key=API_KEY, num_images=4):
    params = {
        "q": query,
        "engine": "google_images",
        "ijn": "0",
        "api_key": api_key
    }

    print(f"Searching for images: {query}")
    response = requests.get(API_ENDPOINT, params=params)
    if response.status_code == 429:
        print("Hit rate limit (429). Consider waiting or upgrading your plan.")
        return []
    response.raise_for_status()
    data = response.json()

    images = data.get("images_results", [])
    urls = []
    for img in images:
        if "original" in img:
            urls.append(img["original"])
        if len(urls) >= num_images:
            break

    if urls:
        print(f"Found URLs for '{query}':")
        for u in urls:
            print(f"  {u}")
    else:
        print(f"No images found for '{query}'")

    return urls

def main():
    with open("products.json", "r") as f:
        data = json.load(f)

    products = data.get("products", [])
    print(f"Loaded {len(products)} products.")

    # Find the first product with 'picsum' in any of its image URLs
    start_index = 0
    found_start = False
    for idx, product in enumerate(products):
        current_image = product.get("image", "")
        additional_images = product.get("additionalImages", [])

        # Check if 'picsum' is in main image or any additional images
        if "picsum" in current_image or any("picsum" in img for img in additional_images):
            start_index = idx
            found_start = True
            print(f"Starting from product index {start_index} with name '{product.get('name', '')}'")
            break

    if not found_start:
        print("No product found with 'picsum' in its URLs. Starting from the beginning.")
        start_index = 0

    # Now start from start_index
    for i in range(start_index, len(products)):
        product = products[i]
        product_name = product.get("name", "")
        if not product_name:
            continue

        new_urls = get_image_urls(product_name)

        if new_urls:
            product["image"] = new_urls[0]
            product["additionalImages"] = new_urls[1:] if len(new_urls) > 1 else []
            print(f"Updated product '{product_name}' with images:")
            print("  Main Image:", product["image"])
            print("  Additional Images:", product["additionalImages"])
        else:
            print(f"No images to update for '{product_name}'.")

        # Write updates after each product
        data["products"] = products
        with open("products.json", "w") as f:
            json.dump(data, f, indent=2)
        print(f"Changes saved after product {i+1}/{len(products)}.")

        # Optional rate limiting
        # time.sleep(1)

    print("All done.")

if __name__ == "__main__":
    main()
