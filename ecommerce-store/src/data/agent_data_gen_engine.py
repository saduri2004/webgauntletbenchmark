import os
import json
import random
import argparse
from datetime import datetime, timedelta
from openai import OpenAI
from tqdm import tqdm
import time
from pathlib import Path
import uuid
from multiprocessing import Pool, Lock, Manager
from functools import partial

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Get the absolute path to the data directory
CURRENT_DIR = Path(__file__).parent.absolute()
PRODUCTS_FILE = CURRENT_DIR / 'products.json'

CATEGORIES = [
    "beauty-personal-care",
    "sports-outdoors", 
    "clothing-shoes-jewelry",
    "home-kitchen",
    "office-products",
    "tools-home-improvement",
    "health-household",
    "patio-lawn-garden",
    "electronics",
    "cell-phones-accessories",
    "video-games",
    "grocery-gourmet-food"
]

def load_existing_products():
    """Load existing products from products.json"""
    if not PRODUCTS_FILE.exists():
        return {"products": []}
    
    try:
        with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            if not content:  # If file is empty
                return {"products": []}
            return json.loads(content)
    except json.JSONDecodeError:
        print(f"Warning: {PRODUCTS_FILE} was corrupted. Creating new products list.")
        return {"products": []}
    except Exception as e:
        print(f"Error reading {PRODUCTS_FILE}: {str(e)}")
        return {"products": []}

def save_products(products_data):
    """Save products to products.json"""
    try:
        with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
            json.dump(products_data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error writing to {PRODUCTS_FILE}: {str(e)}")

def get_products_by_category(products_data):
    """Group existing products by category"""
    products_by_category = {}
    for product in products_data["products"]:
        category = product["categoryId"]
        if category not in products_by_category:
            products_by_category[category] = []
        products_by_category[category].append(product)
    return products_by_category

def generate_product_prompt(category):
    """Generate the prompt for GPT-4"""
    # Load existing products and group by category
    existing_products = load_existing_products()
    products_by_category = get_products_by_category(existing_products)
    
    # Get existing products in this category
    existing_category_products = products_by_category.get(category, [])
    
    # Create a summary of existing products
    existing_products_summary = "\n".join([
        f"- {p['name']}: {p['description'][:100]}... (Tags: {', '.join(p['tags'])}, Features: {', '.join(p['features'])})"
        for p in existing_category_products
    ])
    
    return f"""You are a product data generation expert. Generate a single product listing in the category: {category}.
IMPORTANT: Generate a completely unique product that is different from these existing products in this category:

Existing {category} products:
{existing_products_summary if existing_products_summary else 'No existing products in this category.'}

The product should be in valid JSON format with the following structure:
{{
    "id": "{category}-#####",  # Must be category-subcategory-#####, where ##### is a unique 5-digit number
    "name": "Product Name",
    "description": "Detailed product description",
    "price": 99.99,
    "originalPrice": 129.99,
    "image": "https://picsum.photos/seed/[id]/400/400",  # Use the product ID as the seed
    "additionalImages": [
        "https://picsum.photos/seed/[id]-1/400/400",
        "https://picsum.photos/seed/[id]-2/400/400",
        "https://picsum.photos/seed/[id]-3/400/400"
    ],
    "categoryId": "{category}",
    "subCategoryId": "relevant-subcategory",
    "category": "Category Display Name",
    "subCategory": "Subcategory Display Name",
    "stock": 100,
    "inStock": true,
    "rating": 4.5,
    "reviewCount": 3,
    "reviews": [
        {{
            "id": "review-[product-id]-1",
            "userId": "user-1",
            "userName": "John Doe",
            "rating": 5,
            "title": "Great product",
            "comment": "Detailed review comment",
            "date": "2024-01-01T00:00:00Z",
            "helpful": 10,
            "notHelpful": 2,
            "verifiedPurchase": true
        }},
        // Add 2 more reviews
    ],
    "brand": "Brand Name",
    "model": "Model Number",
    "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
    ],
    "tags": [
        "tag1",
        "tag2",
        "tag3"
    ],
    "specifications": {{
        "Brand": "Brand Name",
        "Model": "Model Number",
        "Color": "Color",
        "Material": "Material"
    }},
    "condition": "new",
    "isEcoFriendly": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "deliveryInfo": {{
        "isFreeDelivery": true,
        "estimatedDays": 3,
        "availableLocations": ["United States", "Canada"],
        "expeditedAvailable": true,
        "expeditedCost": 15.99
    }},
    "returnPolicy": {{
        "daysToReturn": 30,
        "isFreeTurn": true,
        "returnShippingCost": 0
    }},
    "warranty": "1 Year Limited Warranty"
}}

Generate a complete, realistic product that is DIFFERENT from the existing products shown above. Include at least 3 detailed reviews. Ensure all dates are within the last 6 months."""

def generate_unique_product_id(category, existing_products):
    """Generate a unique 5-digit product ID for the given category"""
    existing_ids = {p["id"] for p in existing_products["products"]}
    
    while True:
        # Generate a random UUID and use its first 5 digits
        random_uuid = str(uuid.uuid4().int)[:5].zfill(5)
        new_id = f"{category}-{random_uuid}"
        
        if new_id not in existing_ids:
            return new_id

def generate_product(category):
    """Generate a new product using GPT-4"""
    try:
        # Get existing products to check for ID uniqueness
        existing_products = load_existing_products()
        
        # Generate a unique product ID
        product_id = generate_unique_product_id(category, existing_products)
        
        max_attempts = 3
        for attempt in range(max_attempts):
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a product data generation expert. You must respond ONLY with a valid JSON object, no additional text or explanations."},
                    {"role": "user", "content": generate_product_prompt(category)}
                ],
                temperature=0.7,
            )
            
            try:
                content = response.choices[0].message.content.strip()
                
                # Debug information
                print("\nAPI Response Content:")
                print(content[:200] + "..." if len(content) > 200 else content)
                
                # Remove any potential markdown code block syntax
                if content.startswith("```json"):
                    content = content[7:]
                if content.startswith("```"):
                    content = content[3:]
                if content.endswith("```"):
                    content = content[:-3]
                content = content.strip()
                
                # Parse the response and ensure it's valid JSON
                product_data = json.loads(content)
                
                # Replace the GPT-generated ID with our UUID-based ID
                product_data["id"] = product_id
                
                # Update image URLs with the new ID
                product_data["image"] = f"https://picsum.photos/seed/{product_id}/400/400"
                product_data["additionalImages"] = [
                    f"https://picsum.photos/seed/{product_id}-{i}/400/400"
                    for i in range(1, 4)
                ]
                
                # Update review IDs with the new product ID
                for i, review in enumerate(product_data["reviews"], 1):
                    review["id"] = f"review-{product_id}-{i}"
                
                return product_data
            except json.JSONDecodeError:
                print("Error: Invalid JSON response")
                continue
            except KeyError:
                print("Error: Missing required fields")
                continue
        
        raise Exception("Failed to generate valid product after maximum attempts")
    except Exception as e:
        print(f"Error generating product: {str(e)}")
        return None

def generate_products_for_category(category, target_count, shared_products, lock):
    """Generate products for a specific category"""
    try:
        # Get current count of products in this category
        products_by_category = get_products_by_category(shared_products.value)
        current_count = len(products_by_category.get(category, []))
        
        # Calculate how many new products we need
        num_to_generate = max(0, target_count - current_count)
        
        print(f"Category {category}: Current count = {current_count}, Target = {target_count}, Generating {num_to_generate} new products")
        
        if num_to_generate == 0:
            return
            
        new_products = []
        for _ in tqdm(range(num_to_generate), desc=f"Generating {category} products"):
            try:
                product = generate_product(category)
                if product:
                    new_products.append(product)
                time.sleep(1)  # Rate limiting
            except Exception as e:
                print(f"Error generating product for {category}: {str(e)}")
                continue

        if new_products:
            with lock:
                products_dict = shared_products.value
                products_dict["products"].extend(new_products)
                shared_products.value = products_dict
                
    except Exception as e:
        print(f"Error in generate_products_for_category for {category}: {str(e)}")

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Generate product data for e-commerce store')
    parser.add_argument('--config', type=str, help='JSON file containing category-specific product counts. Format: {"category1": count1, "category2": count2, ...}')
    parser.add_argument('--count', type=int, default=1, help='Default number of products to generate per category if no config is provided')
    args = parser.parse_args()

    # Ensure OPENAI_API_KEY is set
    if not os.getenv('OPENAI_API_KEY'):
        print("Error: OPENAI_API_KEY environment variable is not set")
        return

    # Load category configuration
    category_counts = {}
    if args.config:
        try:
            with open(args.config, 'r') as f:
                category_counts = json.load(f)
            print("Loaded category configuration:")
            for category, count in category_counts.items():
                print(f"  {category}: {count} products")
        except Exception as e:
            print(f"Error loading config file: {str(e)}")
            return
    else:
        # Use default count for all categories
        category_counts = {category: args.count for category in CATEGORIES}
        print(f"Using default count of {args.count} for all categories")

    # Validate categories in config
    invalid_categories = [cat for cat in category_counts.keys() if cat not in CATEGORIES]
    if invalid_categories:
        print(f"Error: Invalid categories in config: {invalid_categories}")
        print(f"Valid categories are: {CATEGORIES}")
        return

    # Add missing categories with count 0
    for category in CATEGORIES:
        if category not in category_counts:
            category_counts[category] = 0

    # Load or initialize products data
    products_data = load_existing_products()
    initial_count = len(products_data["products"])

    # Ensure the directory exists
    PRODUCTS_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    # Save initial empty product list if file doesn't exist
    if not PRODUCTS_FILE.exists():
        save_products(products_data)
        print(f"Created new products file at: {PRODUCTS_FILE}")

    # Set up multiprocessing
    manager = Manager()
    shared_products = manager.Value("products_data", products_data)
    lock = manager.Lock()
    
    # Create a pool of workers
    with Pool() as pool:
        # Filter out categories with count 0
        categories_to_generate = [(cat, count) for cat, count in category_counts.items() if count > 0]
        print(f"\nGenerating products for {len(categories_to_generate)} categories...")
        
        # Create partial function with shared resources
        generate_func = partial(
            generate_products_for_category,
            shared_products=shared_products,
            lock=lock
        )
        
        # Map the function across all categories with their counts
        results = pool.starmap(generate_func, categories_to_generate)
    
    # Save the final results
    save_products(shared_products.value)
    
    final_count = len(shared_products.value["products"])
    print(f"\nSuccessfully added {final_count - initial_count} new products")
    print(f"Total products in database: {final_count}")
    print(f"Products file location: {PRODUCTS_FILE}")

if __name__ == "__main__":
    main()
