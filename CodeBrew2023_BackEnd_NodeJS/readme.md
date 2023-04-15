# Codebrew Backend API
## External API:
1. Spoonacular API (Search recipe): https://spoonacular.com/food-api/docs
2. FoodDataCentral API (Nutrients recipe): https://fdc.nal.usda.gov/ 
3. Perspective API (Checking post toxicity): https://perspectiveapi.com/ 
## INTERNAL API:
### 400: Always empty
User account management:
1. /user/login: Body {username: str, password: str, email: str} -> 200: {token: JWT token} or 400: empty
2. /user/register: Body {username: str, password: str} -> 200: {data: true}
3. /user/validate_token: Body {token: str} -> 200: {data: true}

### API:
#### All prefixes: /api/ 
#### Add your token as {token} in the header
Products management:
1. /products/list: Body {} -> 200: {data: [{product: str, price: num, quantity: num, unit: str}, ...]}
2. /products/info: Body {name, quantity (in g)} -> 200: {data: {nutrient_name: {quantity: num, unit: str}, ...}}

Recipe:
1. /recipe/search (50% tested): Body {query, diet, intolerance, direction: ("asc" or "desc")} -> 200: {data: [{image: url, summary: str, sourceUrl: url, pricePerServing: num, ...} of 5]}
2. /recipe/add_normal (50% tested): Body {username, ingredients: [str1, str2, ...], instructions} -> 200: {data: true}
3. /recipe/add_online (50% tested): Body {username, image, sourceUrl, summary, pricePerServing} -> 200: {data: true}
4. /recipe/retrieve (50% tested): Body {username} -> {data: {online: [{image: url, summary: str, sourceUrl: url, pricePerServing: num}, ...], normal: [{ingredients: [str1, str2, ...], instructions}, ...]}}

Chat:
1. /chat/post: Body {username, post, likes} -> 200: {data: true/ false (if toxic)}
2. /chat/retrieve_post: Body {} -> 200: {data: [{username, post, likes}, ... for 50 latest things]}
3. /chat/recipe_post: Body {username, name, ingredients, instructions, likes} -> 200: {data: true/ false (if toxic)}
4. /chat/retrieve_recipe: Body {} -> 200: {data: [{username, ingredients, instructions, likes}, ... for 50 latest things]}
For updating likes: Just resend the post (1 and 3) with the new likes.