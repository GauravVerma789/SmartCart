import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Load products
products = pd.read_csv("products.csv")


# Convert product descriptions into numbers
vectorizer = TfidfVectorizer(stop_words="english")

tfidf_matrix = vectorizer.fit_transform(products["description"])


# Compare every product with every other product
similarity_matrix = cosine_similarity(tfidf_matrix)


def get_recommendations(product_id, number_of_recommendations=4):

    product_index = products.index[
        products["id"] == product_id
    ][0]

    similarity_scores = list(
        enumerate(similarity_matrix[product_index])
    )

    similarity_scores = sorted(
        similarity_scores,
        key=lambda x: x[1],
        reverse=True
    )

    recommendations = []

    for index, score in similarity_scores[1:number_of_recommendations + 1]:

        product = products.iloc[index]

        recommendations.append({
            "id": int(product["id"]),
            "name": product["name"],
            "category": product["category"],
            "price": float(product["price"]),
            "similarity": round(float(score), 2)
        })

    return recommendations