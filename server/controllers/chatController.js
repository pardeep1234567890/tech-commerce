import Product from '../models/ProductModel.js';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

const buildErrorResponse = (error) => {
  if (!error) {
    return {
      status: 500,
      reply: "Sorry, I'm having trouble thinking right now. Please try again!",
    };
  }

  if (error.status === 429) {
    return {
      status: 429,
      reply:
        'The AI service is rate-limited right now. Please wait a moment and try again.',
    };
  }

  return {
    status: 500,
    reply: "Sorry, I'm having trouble thinking right now. Please try again!",
  };
};

// Build the system prompt that tells the AI WHO it is and WHAT it can do
const buildSystemPrompt = (products, cartItems) => {
  // We convert the product catalog into a compact string
  // Potential problem: If you have 10,000+ products, this string gets HUGE
  // and may exceed the model's context window. For now with a small catalog, it's fine.
  const productCatalog = products.map(p => ({
    _id: p._id,
    name: p.name,
    price: p.price,
    brand: p.brand,
    category: p.category,
    description: p.description,
    rating: p.rating,
    numReviews: p.numReviews,
    countInStock: p.countInStock,
    image: p.image,
  }));

  const cartInfo = cartItems && cartItems.length > 0
    ? `\n\nThe user's current cart contains:\n${JSON.stringify(cartItems, null, 2)}`
    : '\n\nThe user\'s cart is currently empty.';

  return `You are "Aura AI", the friendly and knowledgeable shopping assistant for Aura Apparel — a premium fashion e-commerce store.

YOUR CAPABILITIES:
1. **Product Recommendations**: Suggest products from our catalog based on user preferences (style, budget, occasion, category, brand).
2. **Cart Assistant**: Help users understand what's in their cart, suggest complementary items, and answer cart-related questions.
3. **FAQ & Support**: Answer questions about shipping (free shipping on orders over ₹5,000, delivery in 3-5 business days), returns (30-day easy returns), sizing (standard Indian sizing), payment methods (Credit/Debit cards, UPI, COD available), and order tracking.
4. **Style Advisor / Outfit Builder**: When a user asks for outfit suggestions, style advice, or mentions an occasion (party, casual, office, date night, gym, travel, etc.), suggest a COMPLETE outfit of 2-4 complementary products from the catalog. Include an "outfit" object in your response with the theme name and total price of all suggested products combined.
5. **Budget-based Shopping**: When a user mentions a budget, price limit, or asks for affordable/cheap/budget options, ONLY suggest products that fall within their stated budget. Always mention the price range you filtered for. If no products match their budget, say so honestly and suggest the closest options.
6. **Product Comparison**: When a user asks to compare two or more products (e.g., "compare X vs Y", "difference between X and Y", "which is better"), provide a structured comparison. Include a "comparison" object with product names as columns and rows for: Price, Category, Brand, Rating, Stock availability, and a "Best For" summary.

RULES:
- ONLY recommend products that exist in the catalog below. NEVER make up products.
- Keep responses concise, warm, and helpful. Use emojis sparingly for friendliness.
- When recommending products, include the product _id so the frontend can render product cards.
- All prices are in Indian Rupees (₹). Use ₹ symbol when mentioning prices.
- Format your response as JSON with this exact structure:
  {
    "reply": "Your conversational text response here",
    "products": [
      {
        "_id": "product_id_here",
        "name": "Product Name",
        "price": 999,
        "image": "image_url",
        "brand": "Brand Name"
      }
    ],
    "outfit": {
      "theme": "Outfit Theme Name",
      "totalPrice": 15497
    },
    "comparison": {
      "products": ["Product A Name", "Product B Name"],
      "rows": [
        { "label": "Price", "values": ["₹9,999", "₹6,999"] },
        { "label": "Category", "values": ["Hoodies", "Sweatshirts"] },
        { "label": "Brand", "values": ["Aura Apparel", "Aura Apparel"] },
        { "label": "Rating", "values": ["4.5 ⭐", "4.2 ⭐"] },
        { "label": "In Stock", "values": ["Yes (50)", "Yes (30)"] },
        { "label": "Best For", "values": ["Cold weather layering", "Versatile everyday wear"] }
      ]
    }
  }
- The "products" array should ONLY contain products when you are actively recommending them. For general conversation, FAQ answers, or greetings, use an empty array [].
- The "outfit" field is OPTIONAL. Include it ONLY when suggesting a complete outfit. The "totalPrice" should be the sum of all recommended product prices.
- The "comparison" field is OPTIONAL. Include it ONLY when the user explicitly asks to compare products. Always include rows for Price, Category, Brand, Rating, In Stock, and Best For.
- Maximum 4 products per recommendation to avoid overwhelming the user.
- If a product is out of stock (countInStock is 0), mention it but still show it, noting it's currently unavailable.

PRODUCT CATALOG:
${JSON.stringify(productCatalog, null, 2)}
${cartInfo}`;
};

export const chatWithAI = async (req, res) => {
  try {
    // Check for API key
    if (!process.env.MISTRAL_API_KEY) {
      console.error('MISTRAL_API_KEY is not set in .env file!');
      return res.status(500).json({
        reply: 'AI service is not configured. Please add MISTRAL_API_KEY to your .env file.',
        products: [],
      });
    }

    const { message, history, cartItems } = req.body;

    // Validate that we received a message
    if (!message || message.trim() === '') {
      return res.status(400).json({ reply: 'Message is required', products: [] });
    }

    // Fetch all products from the database for context
    // If MongoDB is down, we still let the chat work — just without product data
    let products = [];
    try {
      products = await Product.find({})
        .select('_id name price brand category description rating numReviews countInStock image')
        .lean();
    } catch (dbError) {
      console.warn('Could not fetch products from DB:', dbError.message);
      // Chat will still work for FAQ and general conversation, just no product recommendations
    }

    const systemPrompt = buildSystemPrompt(products, cartItems);

    // Build the conversation history for Mistral (OpenAI-compatible format)
    // System message comes first, then alternating user/assistant messages
    const conversationMessages = [
      { role: 'system', content: systemPrompt },
    ];

    // Add past messages for conversation context
    if (history && history.length > 0) {
      for (const msg of history) {
        conversationMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    // Add the current user message
    conversationMessages.push({
      role: 'user',
      content: message,
    });

    // Call Mistral API (OpenAI-compatible endpoint)
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: conversationMessages,
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: 'json_object' }, // Mistral supports JSON mode natively
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Mistral API Error:', response.status, JSON.stringify(errorData));
      const errorResponse = buildErrorResponse({ status: response.status });
      return res.status(errorResponse.status).json({
        reply: errorResponse.reply,
        products: [],
      });
    }

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || '';

    console.log('Mistral response received successfully');

    // Try to parse the AI response as JSON
    // Mistral with response_format: json_object should return valid JSON,
    // but we still handle edge cases gracefully.
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiText);
    } catch {
      // If direct parse fails, try to extract JSON from markdown code blocks
      const jsonMatch = aiText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[1]);
        } catch {
          // If still failing, return the raw text without product cards
          parsedResponse = { reply: aiText, products: [] };
        }
      } else {
        parsedResponse = { reply: aiText, products: [] };
      }
    }

    res.json({
      reply: parsedResponse.reply || aiText,
      products: parsedResponse.products || [],
      outfit: parsedResponse.outfit || null,
      comparison: parsedResponse.comparison || null,
    });

  } catch (error) {
    console.error('Chat AI Error:', error.message);
    console.error('Error name:', error.name);

    // Potential problem: The error might contain sensitive info (API keys in stack traces).
    // We send a generic message to the client but log the real error on the server.
    const errorResponse = buildErrorResponse(error);
    res.status(errorResponse.status).json({
      reply: errorResponse.reply,
      products: [],
    });
  }
};
